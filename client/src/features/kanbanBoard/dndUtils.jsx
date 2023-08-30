function findContainer(id, items) {
    if (id in items) {
        return id;
    }

    // for (const [key, value] of Object.entries(items)) {
    //     for (const task of value.tasks) {
    //         if (task._id === id) {
    //             return key;
    //         }
    //     }
    // }

    let foundKey = null;

    Object.entries(items).forEach(([key, value]) => {
        value.tasks.forEach((task) => {
            if (task._id === id) {
                foundKey = key;
            }
        });
    });

    return foundKey;
}

function getTaskIds(items, containerId) {
    return items[containerId].tasks.map((task) => task._id);
}

function getNextContainerId(items) {
    const containerIds = Object.keys(items);
    const lastContainerId = Number(containerIds[containerIds.length - 1]) + 1;
    return `${lastContainerId}`;
}

export {findContainer, getTaskIds, getNextContainerId};
