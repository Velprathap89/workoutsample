import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import ArrowRightAltSharp from "@material-ui/icons/ArrowRightAltSharp";
import SettingsIcon from "@material-ui/icons/Settings";
import './Home.scss';

const Home = () => {
    const history = useHistory();
    const [themeName, setThemeName] = useState("theme-soybean-eclipse");
    const [targetEl, setTargetEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const themeNames = ["theme-soybean-eclipse", "theme-sweetcorn-toffee", "theme-spacecherry-white", "theme-royalpurple-iceflow", "theme-electricBlueLemonade-aquamarine"];

    const handleClick = event => {
        console.log(event);
        setTargetEl(event.currentTarget);
    }

    const onRedirectToProjectPage = () => {
        history.push("/Projects");
    }

    return (<>
        <div className={`home-page ${themeName}`}>
            <div className='hp-first-half'>
                <div className='main-title'>Coding</div>
                <div className='sub-title'>Sharing the Known</div>
            </div>
            <div className='hp-second-half'>
                <div className='main-title'>Sparkles</div>
                <div className='sub-title'>Learning the Unknown</div>
            </div>
            <div className='hp-theme-switcher'>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    className='hp-theme-icon'
                    onClick={handleClick}
                    disableRipple
                >
                    <SettingsIcon />
                </IconButton>
                <Menu className='theme-menu' anchorEl={targetEl}
                    keepMounted
                    open={Boolean(targetEl)}
                    onClose={() => setTargetEl(null)}>
                    {
                        themeNames.map((theme, index) => <MenuItem selected={index === selectedIndex}
                            onClick={() => {
                                setThemeName(`${theme}`);
                                setSelectedIndex(index);
                                setTargetEl(null)
                            }}>
                            <div className={`theme ${theme}`}>
                            </div>
                        </MenuItem>)
                    }
                </Menu>
            </div>
            <Button className='hp-btn' variant='contained' size='medium' disableRipple
                onClick={onRedirectToProjectPage}>
                View Projects <ArrowRightAltSharp className='hp-btn-icon' />
            </Button>
        </div>
    </>)
}

export default Home;