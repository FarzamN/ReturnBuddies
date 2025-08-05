import {
  Body,
  Text,
  Header,
  Oversize,
  FullImage,
  MainInput,
  Validation,
  MainButton,
  ImageButton,
  RequiredText,
  AddDraftCard,
  ImagePickerModal,
  ConfirmOrderModal,
  AboutOversizeModal,
} from "../../../components";
import styles from "../userStyle";
import buttonStyle from "../userStyle";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { appImages } from "../../../assets";
import { required } from "../../../utils/constants";
import { showNotification } from "../../../function";
import { useNavigation } from "@react-navigation/native";
import { scaleSize, wp } from "../../../theme/responsive";
import { uploadReturnItems } from "../../../apis/draftQueries";
import { useCameraGallery, useIskeyboard } from "../../../hooks";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";

const AddDraftItem = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { isKeyboard } = useIskeyboard();
  const { openGallery, openCamera, picker, setPicker } = useCameraGallery();

  const [load, setLoad] = useState(false);
  const [images, setImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [imageErrors, setImageErrors] = useState([]);
  const [submittedItems, setSubmittedItems] = useState([]);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      items: [{ detail: "", oversized: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleImagePick = async (index, source) => {
    const img = source === "camera" ? await openCamera() : await openGallery();

    if (!img) return;

    const updated = [...images];
    updated[index] = img;
    setImages(updated);
  };

  const handleConfirmation = (data) => {
    const errors = data.items.map((_, index) => !images[index]?.uri);
    setImageErrors(errors);

    const hasImageError = errors.some((e) => e);
    if (hasImageError) return;

    const index = fields.length - 1;
    const currentItem = getValues(`items.${index}`);
    const currentImage = images[index];
    setSubmittedItems((prev) => [
      ...prev,
      {
        ...currentItem,
        image: currentImage,
      },
    ]);

    // Remove the current field and image
    remove(index);
    setImages((prev) => {
      const updated = [...prev];
      updated.splice(index, 1); // remove image at index
      return updated;
    });
    setShowConfirmOrder(true);
  };

  const onSubmit = () => {
    const body = new FormData();

    const validItems = submittedItems.filter((item) => item.detail?.trim());

    const inputs = validItems.map((item) => ({
      detail: item.detail,
      oversized: item.oversized,
    }));

    body.append("items", JSON.stringify(inputs));

    validItems.forEach((item) => {
      body.append("files", {
        uri: item.image.uri,
        type: item.image.type,
        name: item.image.name,
      });
    });
    uploadReturnItems(body, setShowConfirmOrder, setLoad, goBack)(dispatch);
  };

  const isValidItem = (item, image) => item?.detail?.trim() && image?.uri;

  const handleAdd = async (data) => {
    setEditMode(false);
    const errors = data.items.map((_, index) => {
      const item = getValues(`items.${index}`);
      return !isValidItem(item, images[index]);
    });
    setImageErrors(errors);

    const hasImageError = errors.some((e) => e);
    if (hasImageError) return;

    const index = fields.length - 1;
    const currentItem = getValues(`items.${index}`);
    const currentImage = images[index];

    setSubmittedItems((prev) => [
      ...prev,
      {
        ...currentItem,
        image: currentImage,
      },
    ]);

    // Remove the current field and image
    remove(index);
    setImages((prev) => {
      const updated = [...prev];
      updated.splice(index, 1); // remove image at index
      return updated;
    });

    // Add a fresh item
    append({ detail: "", oversized: false });
    setImages((prev) => [...prev, null]);
  };

  const handleEdit = (_, index) => {
    if (editMode) {
      showNotification("Please Edit the current item first", "Error");
      return;
    }
    const item = submittedItems[index];
    const updatedItems = [...submittedItems];
    updatedItems.splice(index, 1);
    setSubmittedItems(updatedItems);

    // Replace current field with the item
    remove(fields.length - 1); // remove empty field
    append({ detail: item.detail, oversized: item.oversized });
    setImages([item.image]); // override image with editing one
    setEditMode(true);
  };

  const handleDelete = (index) => {
    const newList = [...submittedItems];
    newList.splice(index, 1);
    setSubmittedItems(newList);
  };

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle={""} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.draftTitle} title={"What are you returning?"} />
        <Height />

        {submittedItems.length > 0 && (
          <AddDraftCard
            submittedItems={submittedItems}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}

        {fields.map((item, index) => (
          <View key={item.id} style={{ marginBottom: wp(5) }}>
            <Space_Between>
              <RequiredText title={"Item details"} required />
              {submittedItems.length >= 1 && (
                <TouchableOpacity
                  style={{ marginTop: -8 }}
                  onPress={() => remove(index)}
                >
                  <FullImage
                    source={appImages.delete}
                    style={globalStyle.deleteIcon}
                  />
                </TouchableOpacity>
              )}
            </Space_Between>

            <MainInput
              small
              noTitle
              required
              control={control}
              Container={{ marginTop: 0 }}
              name={`items.${index}.detail`}
              placeholder="e.g. Black Hoodie - Size XL"
              isError={!!errors?.items?.[index]?.detail}
              rules={{ required: required("Item Details") }}
              message={errors?.items?.[index]?.detail?.message}
            />

            <Height />

            <>
              <RequiredText title="Item" required />
              <ImageButton
                isError={imageErrors[index]}
                noImage={!images[index]?.uri}
                source={
                  images[index]?.uri
                    ? { uri: images[index].uri }
                    : appImages.camera
                }
                onPress={() => setPicker(true)}
                title={
                  images[index]?.name ||
                  "Take a photo of the item you want to return"
                }
              />
              <Validation
                isError={imageErrors[index]}
                message="Please upload image"
              />
              <Height />
            </>
            {/* Oversize checkbox always visible */}
            <Controller
              control={control}
              name={`items.${index}.oversized`}
              render={({ field: { value, onChange } }) => (
                <Oversize
                  focus={value}
                  onPress={() => onChange(!value)}
                  onAboutPress={() => setShowAbout(true)}
                />
              )}
            />

            <Height />
          </View>
        ))}

        <MainButton
          title="+ Add another item"
          onPress={handleSubmit(handleAdd)}
          textStyle={buttonStyle.buttonText}
          style={[
            buttonStyle.button,
            {
              width: undefined,
              borderRadius: 50,
              paddingHorizontal: scaleSize(20),
            },
          ]}
        />
        <Height />
      </ScrollView>
      {!isKeyboard && (
        <>
          <MainButton
            load={load}
            title="Confirm"
            onPress={handleSubmit(handleConfirmation)}
          />
          <Height />
        </>
      )}

      <AboutOversizeModal
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <ConfirmOrderModal
        load={load}
        visible={showConfirmOrder}
        onPress={handleSubmit(onSubmit)}
        onClose={() => setShowConfirmOrder(false)}
      />
      <ImagePickerModal
        visible={picker}
        onClose={() => setPicker(false)}
        onCamera={() => handleImagePick(fields.length - 1, "camera")}
        onPicture={() => handleImagePick(fields.length - 1, "gallery")}
      />
    </Body>
  );
};

export default AddDraftItem;
