/* import React from "react";
import { formatYearMonth } from "../../../util/datefunctions";

import EditorJSHTML from "editorjs-html";
const editorJSHTML = EditorJSHTML();
const SingleBlogCard = ({ blog }) => {
  const { title, createdAt, author, content, coverImg } = blog || {};
  const htmlContent = editorJSHTML.parse(content).join("");

  return (
    <>
      <div className="bg-white p-8">
        {/* header *}
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4">{title}</h1>
          <p className="mb-6">
            {formatYearMonth(createdAt)} by
            <span className="text-blue-400 cursor-pointer">
              {" "}
              {author?.username}
            </span>
          </p>
        </div>
        <div>
          <img src={coverImg} alt="" className="w-full md:h-[520px] bg-cover" />
        </div>

        {/* details *}
        <div className="mt-8 space-y-4">
          {/* <p>{blog.conent & <span>{content}</span>}</p> *}

          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="space-y-3 editorjsdiv"
          />
          <div>
            <span className="text-lg font-medium">Rating: </span>
            <span>4.4 (based on 2,370 reviews)</span>
          </div>
          <h3 className="text-lg font-medium">Key Features: </h3>
          {/* EDIT THIS LIST - doneeee*}
          <div>
            <ul className="space-y-2 pl-5">
              <li>
                1. Trendy Wardrobe Must-Haves: Discover the latest fashion
                essentials that will keep you stylish and confident every
                season.
              </li>
              <li>
                2. Sustainable Style Tips: Learn how to build a chic,
                eco-friendly wardrobe with timeless pieces and conscious
                shopping habits.
              </li>
              <li>
                3. Accessory Spotlight: Elevate your look with curated
                selections of statement jewelry, bags, and shoes that perfectly
                complement any outfit.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogCard;*/

import React from "react";
import { formatYearMonth } from "../../../util/datefunctions";

const SingleBlogCard = ({ blog }) => {
  const { title, createdAt, author, content, coverImg } = blog || {};

  // Function to render Editor.js content
  const renderEditorContent = (content) => {
    return content.map((block, index) => {
      switch (block.type) {
        case "header":
          return (
            <h2 key={index} className="text-2xl font-bold">
              {block.data.text}
            </h2>
          );
        case "paragraph":
          return (
            <p key={index} className="my-4">
              {block.data.text}
            </p>
          );
        case "list":
          return (
            <ul key={index} className="list-disc pl-5 space-y-2">
              {block.data.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        // Add more block types as needed, e.g., image, quote, etc.
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-white p-8">
      {/* header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-medium mb-4">{title}</h1>
        <p className="mb-6">
          {formatYearMonth(createdAt)} by
          <span className="text-blue-400 cursor-pointer">
            {" "}
            {author?.username}
          </span>
        </p>
      </div>
      <div>
        <img src={coverImg} alt="" className="w-full md:h-[520px] bg-cover" />
      </div>

      {/* details */}
      <div className="mt-8 space-y-4">
        <div>{renderEditorContent(content)}</div>

        <div>
          <span className="text-lg font-medium">Rating: </span>
          <span>4.4 (based on 2,370 reviews)</span>
        </div>
        <h3 className="text-lg font-medium">Key Features: </h3>
        <div>
          <ul className="space-y-2 pl-5">
            <li>
              1. Trendy Wardrobe Must-Haves: Discover the latest fashion
              essentials that will keep you stylish and confident every season.
            </li>
            <li>
              2. Sustainable Style Tips: Learn how to build a chic, eco-friendly
              wardrobe with timeless pieces and conscious shopping habits.
            </li>
            <li>
              3. Accessory Spotlight: Elevate your look with curated selections
              of statement jewelry, bags, and shoes that perfectly complement
              any outfit.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
