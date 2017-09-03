import React from "react";
import {
  ImageSideButton,
  Block,
  addNewBlock,
} from "medium-draft";
import axios from "axios";
import { objectToFormData } from '../../../../utils'

class ImageUploadButton extends ImageSideButton {
  /*
  We will only check for first file and also whether
  it is an image or not.
  */
  onChange(e) {
    const attachment = e.target.files[0];
    let data = {
      medium: {
        article_id: 1,
        user_id: 1,
        attachment
      }
    };
    if (attachment.type.indexOf("image/") === 0) {
      axios
      .post("http://localhost:3000/media", objectToFormData(data))
      .then(response => {
        this.props.setEditorState(addNewBlock(
          this.props.getEditorState(),
          Block.IMAGE, {
            src: response.data.attachment_url,
          }
        ));
      });
    }
    this.props.close();
  }
}

export default ImageUploadButton;