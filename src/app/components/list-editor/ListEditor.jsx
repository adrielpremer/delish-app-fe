import React, { Fragment, useState } from "react";
import { Button } from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ListEditor.module.scss";

const defaultIndex = -1;
const newItemIndex = -2;

export const ListEditor = ({
  displayComponent: DisplayComponent,
  editorComponent: EditorComponent,
  data,
  title,
  onChange
}) => {
  const [editIndex, setEditIndex] = useState(defaultIndex);
  const onAdd = ingredient => {
    onChange([...data, ingredient]);
    setEditIndex(defaultIndex);
  };
  const onEdit = (ingredient, index) => {
    let dataArray = data.slice();
    dataArray[index] = ingredient;
    onChange(dataArray);
    setEditIndex(defaultIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <EditorComponent
                onSubmit={ingredient => onEdit(ingredient, index)}
                {...item}
              />
            ) : (
              <Fragment>
                <DisplayComponent {...item} />
                <div className={styles.actions}>
                  <Button
                    onClick={() => {
                      setEditIndex(index);
                    }}
                    compact>
                    <FontAwesomeIcon icon="pen" />
                  </Button>
                </div>
              </Fragment>
            )}
          </li>
        ))}
      </ul>

      {editIndex === newItemIndex ? (
        <EditorComponent onSubmit={onAdd} />
      ) : (
        <Button
          onClick={() => {
            setEditIndex(newItemIndex);
          }}
          compact>
          <FontAwesomeIcon icon="plus" />
        </Button>
      )}
    </div>
  );
};
