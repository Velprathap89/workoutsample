import { useHistory } from "react-router";
import "./Project.scss";

const Projects = () => {
    const history = useHistory();

    return (
        <div className="csp-container">
            <div className="tile-container">
                <div className="tile-item"></div>
                <div className="tile-item p-todo" onClick={() => history.push("/ToDoList")}>
                    To Do List
                </div>
                <div className="tile-item"></div>
                <div className="tile-item p-remainder" onClick={() => history.push("/Remainder")}>
                    Remainder
                </div>
                <div className="tile-item brand-name">CodingSparkles</div>
                <div className="tile-item"></div>
                <div className="tile-item"></div>
                <div className="tile-item p-pokeman" onClick={() => history.push("/Pokemon")} >Pokeman</div>
                <div className="tile-item"></div>
            </div>
        </div>
    )
}

export default Projects;