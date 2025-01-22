import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
import SearchItems from "../../components/shared/searchItems/searchItems";
import OutfitCreate from "../../components/outfits/outfitCreate/outfitCreate";
import PageHeader from "../../components/shared/pageHeader/pageHeader";
import { getOutfitById } from "../../actions/outfitsActions";
import "../../components/outfits/outfits.scss";

const OutfitsAdd = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { success, outfit, loading, error } = useSelector(
    (state) => state.outfitReducer
  );

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (success) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        // navigate("/outfits");
      }, 3000);
    }
    console.log(success);
  }, [success]);

  const searchItemsHandler = (result) => {
    console.log("Selected Result:", result);
    setSelectedItems((prevItems) => [...prevItems, result]);
  };

  useEffect(() => {
    if (id) {
      dispatch(getOutfitById(id));
    }
  }, [id, dispatch]);

  return (
    <>
      {error && (
        <Alert
          variant="danger"
          onClose={() => setShowMessage(false)}
          dismissible
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1050,
            width: "auto",
          }}
        >
          {error}
        </Alert>
      )}
      <div
        id="outfits-add-pg"
        className="mt-nav d-flex align-items-start justify-content-around w-100 px-2 gap-2"
      >
        <div className="form-container w-75 w-sm-100">
          <PageHeader header={id ? "Edit Outfit" : "Create Outfit"} />
          {id && loading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {outfit ? (
            <OutfitCreate
              selectedItems={selectedItems}
              editItem={id ? outfit : null}
              wantToHideEmptyBoxes
            />
          ) : (
            <OutfitCreate selectedItems={selectedItems} />
          )}
        </div>
        {!id && (
          <div className="search-area">
            <SearchItems
              onSelect={searchItemsHandler}
              wantToShowResultsAfterSelect
              wantToRemoveSelectedOneFromResults
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OutfitsAdd;
