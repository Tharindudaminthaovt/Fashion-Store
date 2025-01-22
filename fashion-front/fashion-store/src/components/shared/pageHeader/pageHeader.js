import React from 'react'
import { Button } from 'react-bootstrap';
import './pageHeader.css'

const PageHeader = ({ header, btnName = null, onClickFunc = null}) => {
  return (
    <div className="shared-page-header d-flex justify-content-between">
      <div className="page-header">{header}</div>
      {btnName && onClickFunc && (
        <div className="page-header-btn">
          <Button variant="primary" onClick={() => onClickFunc()}>
            {btnName}
          </Button>
        </div>
      )}
    </div>
  );
}

export default PageHeader