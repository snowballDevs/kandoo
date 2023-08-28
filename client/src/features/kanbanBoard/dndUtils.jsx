function findContainer(id, items) {
    if (id in items) {
        console.log('find container', id);
        return id;
    }

    for (const [key, value] of Object.entries(items)) {
        for (const task of value.tasks) {
            if (task._id === id) {
                return key;
            }
        }
    }
}

function getTaskIds(items, containerId) {
    console.log(items[containerId].tasks);
    return items[containerId].tasks.map((task) => task._id);
}

function getNextContainerId(items) {
    const containerIds = Object.keys(items);
    const lastContainerId = Number(containerIds[containerIds.length - 1]) + 1;
    return `${lastContainerId}`;
}

export {findContainer, getTaskIds, getNextContainerId};
