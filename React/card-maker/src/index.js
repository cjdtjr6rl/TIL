import React, { memo } from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./components/image_file_input/image_file_input";
import CardRepository from "./service/card_repository";
import CommentRepository from "./service/comment_repository";
import UserRepository from "./service/user_repository";

const authService = new AuthService();
const cardRepository = new CardRepository();
const commentRepository = new CommentRepository();
const userRepository = new UserRepository();
const imageUploader = new ImageUploader();
const FileInput = memo(props => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} cardRepository={cardRepository} commentRepository={commentRepository} userRepository={userRepository} />
  </React.StrictMode>,
  document.getElementById("root")
);
