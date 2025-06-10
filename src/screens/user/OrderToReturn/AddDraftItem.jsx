import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text as RnText,
} from "react-native";
import {
  Body,
  Header,
  ImageButton,
  MainButton,
  Oversize,
  RequiredText,
  Text,
  Validation,
} from "../../../components";
import { wp } from "../../../theme/responsive";
import styles from "../userStyle";
import { Height, Space_Between } from "../../../theme/globalStyle";
import { iOS, required } from "../../../utils/constants";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import MainInput from "../../../components/Inputs/MainInput";
import { useGalleryPermission } from "../../../hooks";
import buttonStyle from "../userStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../../theme/colors";
import { uploadReturnItems } from "../../../redux/queries/draftQueries";
import { useDispatch } from "react-redux";
import { appImages } from "../../../assets";

const AddDraftItem = () => {
  const dispatch = useDispatch();
  const { openGallery } = useGalleryPermission();
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [load, setLoad] = useState(false);

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

  const onSubmit = (data) => {
    const errors = data.items.map((_, index) => !images[index]?.uri);
    setImageErrors(errors);

    const hasImageError = errors.some((e) => e);
    if (hasImageError) return;

    const itemsWithImages = data.items.map((item, index) => ({
      ...item,
      image: images[index] || null,
    }));
    // console.log(data.items);
    // console.log("Returned Items:", itemsWithImages);
    uploadReturnItems(data.items, images, setLoad)(dispatch);
  };

  return (
    <Body horizontal={wp(5)}>
      <Header title={"Order Details"} />
      <Height />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.draftTitle} title={"What are you returning?"} />
        <Height />

        {fields.map((item, index) => (
          <View key={item.id} style={{ marginBottom: wp(5) }}>
            <Space_Between>
              <RequiredText title={"Item details"} required />
              {index > 0 && (
                <TouchableOpacity onPress={() => remove(index)}>
                  <Icon
                    type="MaterialIcons"
                    name="delete-forever"
                    color={colors.error}
                    size={20}
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
                <Oversize focus={value} onPress={() => onChange(!value)} />
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
        onPress={handleSubmit(onSubmit)}
      />
      <Height />
    </Body>
  );
};

export default AddDraftItem;
