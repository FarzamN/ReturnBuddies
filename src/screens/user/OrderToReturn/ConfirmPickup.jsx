import React from "react";
import {
  Body,
  Header,
  ItemPickupButton,
  PickupButton,
} from "../../../components";
import { wp } from "../../../theme/responsive";
import { useSelector } from "react-redux";
import { appImages } from "../../../assets";
import moment from "moment";

const ConfirmPickup = () => {
  const { address, pickupMethod, time, date, phone } = useSelector(
    (state) => state.draft.draftReturn
  );
  const data = {
    _id: ["68495eb05e3292f1838947f4"],
    date: "2025-06-18",
    time: "2:00 PM - 6:00 PM",
    pickupMethod: "Doorstep",
    note: "",
    address: "",
  };
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Confirm Pickup" noSetting />
      <PickupButton
        source={appImages.location}
        title={address || "Add address"}
      />
      <PickupButton
        source={appImages.truck}
        title={pickupMethod}
        detail={
          pickupMethod === "Doorstep"
            ? "I placed the items on the front porch."
            : "I will directly handoff the items."
        }
      />
      <PickupButton
        source={appImages.clock}
        title={moment(date).format("dddd, MMM DD, yy")}
        detail={time}
      />
      <PickupButton
        source={appImages.call}
        title={phone || "Add phone number"}
      />
      <ItemPickupButton title={`Items to be pickedup (${2})`} />
    </Body>
  );
};

export default ConfirmPickup;
