function inherit(superClass, subClass) {
    for (property in superClass) {
        if (superClass.hasOwnProperty(property)) {
            if (subClass[property] === undefined) {
                subClass[property] = superClass[property];
            }   
        }   
    }   
}
