import { useState, useEffect } from 'react';
function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(function () {
        fetch('/public/data/projects.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setProjects(data.projects);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <p>Se incarca...</p>;
    }
    return (
        <div>
            <h3>Proiecte</h3>
            {<ul>
                {projects.map(function (projects, index) {
                    return <li key={index}>{projects.title}</li>;
                })}
            </ul>}
        </div>
    );
}
export default ProjectList;
