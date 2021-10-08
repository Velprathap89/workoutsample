import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  boxRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "linear-gradient(to right top, #64f38c, #93f390, #b4f499, #cef4a6, #e2f5b7)"
  },
  demo: {
    border: "1px solid grey",
    borderRadius: "5px",
    margin: "5px 0"
  },
  typoRoot: {
    margin: "15px 0"
  },
  containerRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textFieldRoot: {
    margin: "0 10px"
  },
  btnRoot: {
    margin: "0 10px"
  },
  completedItem: {
    textDecoration: "line-through",
    color: "mediumblue"
  }
}));

const ToDoList = () => {
  const classes = useStyles();
  const [itemText, setItemText] = useState("");
  const [showError, setShowError] = useState(false);
  const [itemList, setItemList] = useState([]);
  const onChange = (e) => {
    setItemText(e.target.value);
  };

  const onAddItem = () => {
    const matchingItem = itemList.filter((item) => item.value === itemText);
    if (matchingItem && matchingItem.length > 0) {
      setShowError(true);
      return false;
    }
    showError && setShowError(false);
    const newItem = {
      value: itemText,
      isCompleted: false
    };
    const items = [...itemList, newItem];
    setItemList(items);
    setItemText("");
  };

  const onDeleteItem = (e) => {
    const selectedElement = e.target.closest(".MuiIconButton-root");
    if (selectedElement) {
      const deletedItem = selectedElement.id;
      const items = itemList.filter((item) => item.value !== deletedItem);
      setItemList(items);
    }
  };

  const onItemCompleted = (e) => {
    const completedItem = e.target.id;
    itemList.forEach((item) => {
      if (item.value === completedItem) {
        item.isCompleted = true;
      }
    });
    setItemList([...itemList]);
  };

  const renderListItems = (tasks) => {
    return (
      <List>
        {!tasks.length ? (
          <ListItem>
            <ListItemText
              className={classes.containerRoot}
              primary="No Items"
            ></ListItemText>
          </ListItem>
        ) : (
          tasks.map((item) => {
            return (
              <ListItem key={item.value} className={classes.demo}>
                <ListItemIcon>
                  <Checkbox
                    checked={item.isCompleted}
                    disabled={item.isCompleted}
                    id={item.value}
                    edge="start"
                    tabIndex="-1"
                    onChange={onItemCompleted}
                  ></Checkbox>
                </ListItemIcon>
                <ListItemText
                  className={item.isCompleted ? classes.completedItem : ""}
                >
                  {item.value}
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    id={item.value}
                    edge="end"
                    aria-label="delete"
                    onClick={onDeleteItem}
                  >
                    <DeleteForever color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        )}
      </List>
    );
  };

  return (
    <Box className={classes.boxRoot}>
      <Paper className={classes.containerRoot} elevation={3}>
        <Container>
          <Typography
            className={`${classes.containerRoot} ${classes.typoRoot}`}
            variant="h6"
            component="h4"
          >
            To Do List
        </Typography>
          <Container className={classes.containerRoot}>
            <TextField
              className={classes.textFieldRoot}
              placeholder="Enter Your Text"
              error={showError}
              helperText={showError ? "Duplicate Task" : ""}
              type="text"
              size="small"
              variant="outlined"
              value={itemText}
              onChange={onChange}
            />
            <Button
              className={classes.btnRoot}
              variant="contained"
              color="primary"
              onClick={onAddItem}
              disableRipple
            >
              Add
          </Button>
          </Container>
          {renderListItems(itemList)}
        </Container>
      </Paper>
    </Box>
  );
};

export default ToDoList;
