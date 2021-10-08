import { useEffect, useState } from "react";
import {
    Box, Avatar, ListItem, ListItemAvatar,
    ListItemText, List, makeStyles, ListSubheader, Typography
} from "@material-ui/core";
import KeyboardArrowLeftTwoToneIcon from '@material-ui/icons/KeyboardArrowLeftTwoTone';
import KeyboardArrowRightTwoToneIcon from '@material-ui/icons/KeyboardArrowRightTwoTone';

const useStyles = makeStyles(theme => ({
    boxRoot: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(to right bottom, #6882fe, #6a89fe, #6e90fd, #7297fc, #789efa, #759cfa, #7399fb, #7097fb, #658afc, #5e7cfd, #5a6efb, #5a5ef9)"
    },
    headerRoot: {
        fontSize: "larger",
        color: "black",
        borderRadius: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem"
    },
    headerIcon: {
        alignIitems: "center",
        display: "flex",
        justifyContent: "flex-end"
    },
    listRoot: {
        width: '100%',
        maxWidth: 320,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '.5rem'
    },
    listItemRoot: {
        gap: "1rem"
    },
    avatarRoot: {
        height: "75px",
        width: "75px",
        borderRadius: "30%"
    },
    avatarImg: {
        height: "75px",
        width: "75px",
        objectFit: "cover"
    },
    iconColor: {
        fill: 'lightseagreen'
    }
}));

const Remainder = () => {
    const classes = useStyles();
    const todayDate = new Date();
    const birthObj = [
        {
            name: 'Sean Rolden',
            imageSrc: `${process.env.PUBLIC_URL}Images/1.jpg`,
            dob: new Date(1996, todayDate.getMonth(), todayDate.getDate())
        },
        {
            name: 'Sara Smith',
            imageSrc: `${process.env.PUBLIC_URL}Images/2.jpg`,
            dob: new Date(1987, todayDate.getMonth(), todayDate.getDate())
        },
        {
            name: 'Smith John',
            imageSrc: `${process.env.PUBLIC_URL}Images/3.jpg`,
            dob: new Date(1993, todayDate.getMonth(), todayDate.getDate())
        },
        {
            name: 'Victor Paul',
            imageSrc: `${process.env.PUBLIC_URL}Images/6.jpg`,
            dob: new Date(1991, todayDate.getMonth(), todayDate.getDate())
        },
        {
            name: 'Jessica John',
            imageSrc: `${process.env.PUBLIC_URL}Images/5.jpg`,
            dob: new Date(1993, todayDate.getMonth(), todayDate.getDate() + 1)
        },
        {
            name: 'Julia Sean',
            imageSrc: `${process.env.PUBLIC_URL}Images/4.jpg`,
            dob: new Date(1995, todayDate.getMonth(), todayDate.getDate() + 1)
        },
        {
            name: 'James Bond',
            imageSrc: `${process.env.PUBLIC_URL}Images/7.jpg`,
            dob: new Date(1997, todayDate.getMonth(), todayDate.getDate() + 1)
        },
        {
            name: 'Stephen Jeorge',
            imageSrc: `${process.env.PUBLIC_URL}Images/8.jpg`,
            dob: new Date(1994, todayDate.getMonth(), todayDate.getDate() - 1)
        },
        {
            name: 'Andrea Victor',
            imageSrc: `${process.env.PUBLIC_URL}Images/9.jpg`,
            dob: new Date(2001, todayDate.getMonth(), todayDate.getDate() - 1)
        }
    ];
    const [todayData, setTodayData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        getBirthdayData(currentDate);
        // eslint-disable-next-line
    }, [currentDate]);

    const getAge = dob => {
        const todayDate = new Date();
        const diff = todayDate.getTime() - dob.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    const getBirthdayData = date => {
        const filtedData = birthObj.filter(obj =>
            obj.dob.getDate() === date.getDate() && obj.dob.getMonth() === date.getMonth()
        );
        setTodayData(filtedData);
    }

    const handleNext = () => {
        const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        setCurrentDate(nextDate);
    };

    const handlePrev = () => {
        const prevDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
        setCurrentDate(prevDate);
    };

    return (
        <Box className={classes.boxRoot}>
            <List className={classes.listRoot} subheader={
                <ListSubheader component="div" className={classes.headerRoot} disableSticky>
                    <Typography variant="h6">
                        {`${!todayData.length ? "No Birthday" : `${todayData.length} Birthday's`} Today`}
                    </Typography>
                    <Box className={classes.headerIcon}>
                        <KeyboardArrowLeftTwoToneIcon onClick={handlePrev}></KeyboardArrowLeftTwoToneIcon>
                        <KeyboardArrowRightTwoToneIcon onClick={handleNext}></KeyboardArrowRightTwoToneIcon>
                    </Box>
                </ListSubheader>
            }>
                {todayData && todayData.map(bObj => {
                    return (<ListItem key={bObj.name} className={classes.listItemRoot}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatarRoot}>
                                <img className={classes.avatarImg} src={bObj.imageSrc} alt={bObj.name} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bObj.name} secondary={`${getAge(bObj.dob)} Years Old`} />
                    </ListItem>)
                })}
            </List>
        </Box>
    )
}

export default Remainder;