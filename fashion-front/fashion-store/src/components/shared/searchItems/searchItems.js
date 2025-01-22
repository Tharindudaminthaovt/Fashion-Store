import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  Button,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchItems } from "../../../actions/searchItemsActions";
import Item from "../item/item";

const SearchItems = ({
  onSelect,
  wantToShowResultsAfterSelect = false,
  wantToRemoveSelectedOneFromResults = false,
  wantToHaveInitialFullResults = true
}) => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.searchItemsReducer);
  const { loading, items, error } = searchState;

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    dispatch(searchItems(query));
    setShowResults(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      dispatch(searchItems(query));
      setShowResults(true);
    }
  };

  const handleSelect = (item) => {
    if (!wantToShowResultsAfterSelect) setShowResults(false);
    if (wantToRemoveSelectedOneFromResults) {
      setFilteredItems(filteredItems.filter((i) => i._id !== item._id));
    }
    // setQuery(item.category);
    if (onSelect) onSelect(item);
  };

  return (
    <div
      className="d-flex flex-column align-items-center my-3"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <Form onSubmit={handleSearch} className="w-100">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(filteredItems.length > 0)}
            className="rounded-start"
          />
          <Button variant="primary" type="submit" className="rounded-end">
            🔍
          </Button>
        </InputGroup>
      </Form>
      {loading && <Spinner animation="border" className="mt-2" />}
      {error && <div className="text-danger mt-2">{error}</div>}
      {showResults && filteredItems.length > 0 && (
        <ListGroup className="w-100 mt-2 d-flex gap-3">
          {filteredItems.map((item, index) => (
            <div key={index} onClick={() => handleSelect(item)}>
              <Item item={item} />
            </div>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchItems;
