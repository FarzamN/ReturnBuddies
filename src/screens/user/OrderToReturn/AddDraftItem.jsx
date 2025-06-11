import {
  View,
  ScrollView,
  Text as RnText,
  TouchableOpacity,
} from "react-native";
import {
  Body,
  Text,
  Header,
  Oversize,
  Validation,
  MainButton,
  ImageButton,
  RequiredText,
  AboutOversizeModal,
  ConfirmOrderModal,
} from "../../../components";
import styles from "../userStyle";
import buttonStyle from "../userStyle";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { appImages } from "../../../assets";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { useGalleryPermission } from "../../../hooks";
import { iOS, required } from "../../../utils/constants";
import MainInput from "../../../components/Inputs/MainInput";
import { Height, Space_Between } from "../../../theme/globalStyle";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { uploadReturnItems } from "../../../redux/queries/draftQueries";

const AddDraftItem = () => {
  const dispatch = useDispatch();
  const { openGallery } = useGalleryPermission();
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [load, setLoad] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);

  const {
    control,
    handleSubmit,
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

  const handleImagePick = async (index) => {
    const img = await openGallery();
    const updated = [...images];
    updated[index] = img;
    setImages(updated);
  };

  const handleConfirmation = (data) => {
    const errors = data.items.map((_, index) => !images[index]?.uri);
    setImageErrors(errors);

    const hasImageError = errors.some((e) => e);
    if (hasImageError) return;

    // const itemsWithImages = data.items.map((item, index) => ({
    //   ...item,
    //   image: images[index] || null,
    // }));
    setShowConfirmOrder(true);
  };

  const onSubmit = (data) => {
    // console.log("Returned Items:", itemsWithImages);
    uploadReturnItems(
      data.items,
      images,
      setShowConfirmOrder,
      setLoad
    )(dispatch);
  };

  return (
    <Body horizontal={wp(5)}>
      {/* <Header title={"Order Details"} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Height />
        <Height />
        <Text style={styles.draftTitle} title={"What are you returning?"} />
        <Height />

        {fields.map((item, index) => (
          <View key={item.id} style={{ marginBottom: wp(5) }}>
            <Space_Between>
              <RequiredText title={"Item details"} required />
              {index > 0 && (
                <TouchableOpacity
                  style={{ marginTop: -8 }}
                  onPress={() => remove(index)}
                >
                  <Icon
                    size={20}
                    type="MaterialIcons"
                    name="delete-forever"
                    color={colors.error}
                  />
                </TouchableOpacity>
              )}
            </Space_Between>
            <MainInput
              small
              noTitle
              name={`items.${index}.detail`}
              control={control}
              isError={!!errors?.items?.[index]?.detail}
              Container={{ marginTop: 0 }}
              message={errors?.items?.[index]?.detail?.message}
              placeholder="e.g. Black Hoodie - Size XL"
              rules={{ required: required("Item Details") }}
            />
            <Height />
            <RequiredText title="Item" required />
            <ImageButton
              isError={imageErrors[index]}
              noImage={!images[index]?.uri}
              source={
                images[index]?.uri
                  ? { uri: images[index].uri }
                  : appImages.camera
              }
              onPress={() => handleImagePick(index)}
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
          textStyle={buttonStyle.buttonText}
          style={[buttonStyle.button, { width: "50%" }]}
          title="+ Add Another Item"
          onPress={() =>
            append({ detail: "", oversized: false }) ||
            setImages((prev) => [...prev, null])
          }
        />
        <Height />
      </ScrollView>
      <MainButton
        load={load}
        title="Confirm"
        onPress={handleSubmit(handleConfirmation)}
      />
      <Height />
      <AboutOversizeModal
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <ConfirmOrderModal
        visible={showConfirmOrder}
        onClose={() => setShowConfirmOrder(false)}
        load={load}
        onPress={handleSubmit(onSubmit)}
      />
    </Body>
  );
};

export default AddDraftItem;
