import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "./../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: activeNote,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, date, title, onInputChange, formState } = useForm(activeNote);
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(
      newDate
    );
  }, [date]);
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length) {
      Swal.fire("Updated Note", messageSaved, "success");
    }
  }, [messageSaved]);
  const saveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({ target }) => {
    if (!target.files) return;

    dispatch(startUploadingFiles(target.files));
  };

  const fileInputRef = useRef();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
      alignItems="center"
      key={activeNote.id}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          style={{ display: " none" }}
          id="files"
          onChange={onFileInputChange}
          type="file"
          ref={fileInputRef}
          multiple
        />

        <IconButton
          onClick={() => fileInputRef.current.click()}
          color="primary"
          disabled={isSaving}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={saveNote}
          color="primary"
          sx={{ p: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Type a title"
          label="Title"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", my: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          name="body"
          value={body}
          onChange={onInputChange}
          fullWidth
          multiline
          placeholder="What happen today?"
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
