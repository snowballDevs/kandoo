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

// function getTaskIds(items, containerId) {
//     return items[containerId]?.tasks.map((task) => task._id);
// }

function getTaskIds(items, containerId) {
    const container = items[containerId];
    if (container) {
        return container?.tasks.map((task) => task._id) || [];
    }
    return [];
}

function getNextContainerId(items) {
    if (!items.length) {
        return '0';
    }

    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];
    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);

    // const containerIds = Object.keys(items);
    // const lastContainerId = containerIds[containerIds.length - 1];
    // console.log(lastContainerId);
    // return `${lastContainerId}` + 1;

    // const containerIds = Object.keys(items);

    // return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
}

export {findContainer, getTaskIds, getNextContainerId};
