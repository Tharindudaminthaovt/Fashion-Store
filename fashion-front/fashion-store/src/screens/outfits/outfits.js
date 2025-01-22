import React from "react";
import OutfitsList from "../../components/outfits/outfitsList/outfitsList";
import "../../components/outfits/outfits.scss";
import PageHeader from "../../components/shared/pageHeader/pageHeader";
import { useNavigate } from "react-router-dom";

const Outfits = () => {
  const navigate = useNavigate();

  const createOutfitHandler = () => {
    navigate('/outfits/add')
  };

  return (
    <div className="mt-nav">
      <div className="">
        <PageHeader
          header="Outfits"
          btnName="Add Outfit"
          onClickFunc={createOutfitHandler}
        />
      </div>

      <div className="">
        <OutfitsList />
      </div>
    </div>
  );
};

export default Outfits;
