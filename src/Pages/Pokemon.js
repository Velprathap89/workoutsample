import axios from "axios";
import { useEffect, useState } from "react";
import {
    Grid, Paper, makeStyles, ButtonGroup, Button, Typography, Box,
    CardActionArea, CardContent, Card, Chip, Dialog, Tabs, Tab, LinearProgress, Tooltip
} from "@material-ui/core";
import PrevIcon from "@material-ui/icons/NavigateBefore";
import NextIcon from "@material-ui/icons/NavigateNext";

// Customizing styles
const useStyles = makeStyles((theme) => ({
    centerAlign: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.primary,
        gap: "1em"
    },
    flexColumn: {
        gap: "1em",
        flexDirection: "column"
    },
    flexRow: {
        flexDirection: "row",
        gap: '4rem',
        padding: '1rem'
    },
    btn: {
        borderRadius: "1rem",
        borderColor: "black",
        color: "black"
    },
    btnGroup: {
        margin: "1rem"
    },
    cardContent: {
        flexDirection: "column",
        borderRadius: "2rem",
        padding: 0
    },
    cardContentBox: {
        padding: "1rem",
        borderRadius: "1rem 1rem 0 0",
        backgroundColor: "#FFFFFF"
    },
    cardImage: {
        height: "10rem",
        width: "10rem",
        borderRadius: "50%"
    },
    tabRoot: {
        width: "100%"
    },
    chipRoot: {
        margin: '0 .25rem'
    }
}));

const Pokemon = () => {
    const classes = useStyles();
    const [showDialog, setShowDialog] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [pokemonData, setPokemonData] = useState([]);
    const [requestUrl, setRequestUrl] = useState({
        url: {
            prev: null,
            next: null,
            initial: 'https://pokeapi.co/api/v2/pokemon' // Initial Api
        }
    });

    // Pokemon request and response processing
    const loadPokemonData = async (operation) => {
        const { url } = requestUrl;
        const pokemonUrl = operation === "initial" ? url.initial : operation === "next" ? url.next : url.prev;
        const response = await axios.get(pokemonUrl);
        url.next = response.data.next;
        url.prev = response.data.previous;
        setRequestUrl({ url });
        const result = await response.data.results;
        const urls = result.map(res => axios.get(res.url));
        const pokemonData = await (await axios.all(urls)).map(uRes => uRes.data);
        setPokemonData(pokemonData);
    }

    useEffect(() => {        
        loadPokemonData("initial");
        // eslint-disable-next-line
    }, []);

    // Processing the background color based on the pokemon type
    const getBackColor = (poke, type) => {
        let backColor = type === "img" ? "#fffcdb" : "#EEE8AA";
        const pokeTypes = poke.types.map(i => i.type.name);
        if (pokeTypes.includes("fire")) {
            backColor = type === "img" ? "#fff1ee" : "#FEC5BB";
        } else if (pokeTypes.includes("grass")) {
            backColor = type === "img" ? "#ccfcef" : "#80FFDB";
        } else if (pokeTypes.includes("water")) {
            backColor = type === "img" ? "#f2f5ff" : "#DFE7FD";
        } else if (pokeTypes.includes("bug")) {
            backColor = type === "img" ? "#d6f5ce" : "#B0DEA3"
        } else if (pokeTypes.includes("normal")) {
            backColor = type === "img" ? "#8efafa" : "#E0FFFF"
        } else if (pokeTypes.includes("electric")) {
            backColor = type === "img" ? "#ebfcf2" : "#D8E2DC"
        } else if (pokeTypes.includes("ground")) {
            backColor = type === "img" ? "#ffebf2" : "#FAD2E1";
        } else if (pokeTypes.includes("fairy")) {
            backColor = type === "img" ? "#fcf7f2" : "#FFF1E6";
        } else if (pokeTypes.includes("ghost")) {
            backColor = type === "img" ? "#ffcbc2" : "#F8EDEB";
        } else if (pokeTypes.includes("fighting")) {
            backColor = type === "img" ? "#c2fcae" : "#F1FAEE";
        } else if (pokeTypes.includes("rock")) {
            backColor = type === "img" ? "#c9fdff" : "#A8DADC";
        }
        return backColor;
    }

    // Converting the pokemon name first letter uppercase
    const getPokeName = name => name.slice(0, 1).toUpperCase() + name.slice(1, name.length);

    // Forming the pokeman id to display
    const getPokeId = id => {
        if (id < 10) return `#00${id}`;
        if (id < 100 && id >= 10) return `#0${id}`;
        if (id >= 100) return `#${id}`;
    }

    // Tab Panel component to display the tab content
    const TabPanel = props => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    // Method to process the pokemon stat values
    const MIN = 0, MAX = 200;
    const normalise = value => (value - MIN) * 100 / (MAX - MIN);

    const { url } = requestUrl;
    return (<>
        <Box className={`${classes.centerAlign} ${classes.flexColumn}`}>
            {/* Pokemon Title */}
            <Typography variant='h4'>Pokemon App</Typography>
            {/* Navigation Buttons */}
            <ButtonGroup className={classes.btnGroup} variant='contained' size='medium' color='secondary'>
                <Button variant='contained' disabled={url.prev === null}
                    size="medium" color="secondary"
                    startIcon={<PrevIcon />}
                    onClick={() => loadPokemonData("prev")}>Prev</Button>
                <Button variant='contained' disabled={url.next === null}
                    size="medium" color="secondary"
                    startIcon={<NextIcon />}
                    onClick={() => loadPokemonData("next")}>Next</Button>
            </ButtonGroup>
        </Box>
        {/* Pokemon List Display */}
        <Box>
            <Grid container spacing={1}>
                {pokemonData ? pokemonData.map(poke => {
                    const types = poke.types.map(item => item.type.name);
                    return (
                        <Grid key={poke.id} item xs={12} sm={6} md={4} lg={3}>
                            <Paper className={`${classes.paper} ${classes.centerAlign}`} style={{ backgroundColor: getBackColor(poke, 'paper') }}>
                                <Box className={`${classes.flexColumn} ${classes.centerAlign}`}>
                                    <Tooltip title="More Info">
                                        <Button className={classes.btn} variant='outlined'
                                            size='small'
                                            onClick={() => {
                                                setShowDialog(!showDialog);
                                                setSelectedPokemon(poke);
                                            }}>
                                            {getPokeId(poke.id)}
                                        </Button>
                                    </Tooltip>
                                    <Typography variant='h5'>{getPokeName(poke.name)}</Typography>
                                    <Box>
                                        <Typography>{`Type: ${types.toString()}`}</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <img height='100px' width='100px' src={poke.sprites.other.dream_world.front_default} alt={poke.name}></img>
                                </Box>
                            </Paper>
                        </Grid>
                    )
                }) : "Loading"}
            </Grid>
        </Box>
        {/* Pokemon Details Display */}
        {showDialog &&
            <Dialog open={showDialog}
                onClose={() => {
                    setShowDialog(!showDialog);
                    setSelectedPokemon({});
                }}>
                <Card className={classes.root}>
                    <CardActionArea disableRipple style={{ backgroundColor: getBackColor(selectedPokemon, 'paper') }}>
                        <CardContent className={`${classes.centerAlign} ${classes.cardContent}`}>
                            <Box style={{ padding: '1rem 0 1rem 0' }}>
                                <Paper className={`${classes.centerAlign} ${classes.cardImage}`} style={{ backgroundColor: getBackColor(selectedPokemon, 'img') }}>
                                    <img height='150px' width='150px' src={selectedPokemon.sprites.other.dream_world.front_default} alt={selectedPokemon.name}></img>
                                </Paper>
                            </Box>
                            <Box className={`${classes.centerAlign} ${classes.flexColumn} ${classes.cardContentBox}`}>
                                <Chip size='medium' color='primary' label={getPokeName(selectedPokemon.name)} style={{ color: 'black', backgroundColor: getBackColor(selectedPokemon, 'paper') }} />
                                <Box className={`${classes.centerAlign} ${classes.flexColumn} ${classes.flexRow}`}>
                                    <Typography className={`${classes.centerAlign} ${classes.flexColumn}`}>
                                        Height: {selectedPokemon.height} m
                                                        </Typography>
                                    <Typography className={`${classes.centerAlign} ${classes.flexColumn}`}>
                                        Weight: {selectedPokemon.weight} kg
                                                        </Typography>
                                </Box>
                                <Paper className={classes.tabRoot} style={{ border: `1px solid ${getBackColor(selectedPokemon)}` }}>
                                    <Tabs
                                        value={tabIndex}
                                        onChange={(event, item) => {
                                            setTabIndex(item)
                                        }}
                                        TabIndicatorProps={{
                                            style: { backgroundColor: getBackColor(selectedPokemon) }
                                        }}
                                        textColor="primary"
                                    >
                                        <Tab label="Stats" disableRipple />
                                        <Tab label="Abilities" disableRipple />
                                    </Tabs>
                                    <TabPanel value={tabIndex} index={0}>
                                        <span>HP</span> <LinearProgress variant="determinate" value={normalise(selectedPokemon.stats[0].base_stat)} />
                                        <span>ATK</span> <LinearProgress variant="determinate" value={normalise(selectedPokemon.stats[1].base_stat)} />
                                        <span>DEF</span> <LinearProgress variant="determinate" value={normalise(selectedPokemon.stats[2].base_stat)} />
                                        <span>SATK</span> <LinearProgress variant="determinate" value={normalise(selectedPokemon.stats[3].base_stat)} />
                                        <span>SDEF</span> <LinearProgress variant="determinate" value={normalise(selectedPokemon.stats[4].base_stat)} />
                                        <span>SPD</span> <LinearProgress variant="determinate" value={normalise(selectedPokemon.stats[5].base_stat)} />
                                    </TabPanel>
                                    <TabPanel value={tabIndex} index={1}>
                                        {selectedPokemon.abilities.map(item => {
                                            return (
                                                <Chip className={classes.chipRoot} key={item.ability.name} variant='outlined' size='small' label={item.ability.name} />
                                            )
                                        })}
                                    </TabPanel>
                                </Paper>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Dialog>
        }
    </>
    )
}

export default Pokemon;