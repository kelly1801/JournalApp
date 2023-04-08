import React, { useMemo } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";
export const SideBarItem = ({ title = '', body, id, date, imgUrls = [] }) => {
  const newTitle = useMemo(() => {
    return title.length > 17 
    ? title.substring(0, 17) + '...'
    : title
  }, [title]);
const dispatch = useDispatch()
  const onClickActiveNote = ( note) => {
    dispatch(setActiveNote(note));
  }
  return (
    
      <ListItem disablePadding onClick={() => onClickActiveNote({title, body, id, date, imgUrls})}>
        <ListItemButton>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>

          <Grid container>
            <ListItemText primary={newTitle} />
            <ListItemText secondary={body} />
          </Grid>
        </ListItemButton>
      </ListItem>
    
  );
};
