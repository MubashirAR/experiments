var params = {
    myObject: {
        myInnerBoolean: true,
        myInnerObject: { myInnerInnerNumber: 2 },
        myInnerArray: [1, 2, 3]
    },
    myArray: [{ name: "Mubashir", surname: "Reshamwala" }, 2, 3],
    myNumber: 1
}
var params2 = {
        myObject: {
            myInnerBoolean: true,
            myInnerObject: { myInnerInnerNumber: 2 },
            myInnerArray: [1, 2, 3]
        },
        myArray: [{ name: "Mubashir", surname: "AR" }],
        myNumber: 1
    }
    // console.log(iterateOverItemsInObject(params, params2))
console.log(compareObjects(params, params2));


function iterateOverItemsInObject(object) {
    var objStructure = {};
    switch (typeof object) {
        case 'string':
            return (typeof object);
            // break;
        case 'number':
            return (typeof object);
            // break;
        case 'boolean':
            return (typeof object);
            // break;
        case 'object':
            if (Array.isArray(object)) {
                // object.forEach((item) => objStructure[item] = iterateOverItemsInObject(item))
                objStructure = [];
                objStructure[0] = iterateOverItemsInObject(object[0])
            } else {
                for (key in object) {
                    objStructure[key] = iterateOverItemsInObject(object[key])
                }
            }
            break;
        default:
            return
            // break;
    }
    objStructure.hasBeenIterated = false;
    return objStructure
}

function compareObjects(referenceObject, objectToCompare) {
    var result = true;
    var missingValue;
    var refObjStructure = {};
    if (referenceObject.hasBeenIterated === false) {
        refObjStructure = iterateOverItemsInObject(referenceObject);
    } else {
        refObjStructure = referenceObject;
    }

    if (typeof objectToCompare == 'undefined') {
        missingValue = refObjStructure;
        return false;

    } else if (typeof refObjStructure == 'string') {
        // console.log((typeof refObjStructure), (typeof objectToCompare), 'string');
        return (typeof refObjStructure == typeof objectToCompare);

    } else if (typeof refObjStructure == 'number') {
        // console.log(typeof refObjStructure == typeof objectToCompare, refObjStructure, objectToCompare, 'number');
        return (typeof refObjStructure == typeof objectToCompare);

    } else if (typeof refObjStructure == 'boolean') {
        // console.log(typeof refObjStructure, typeof objectToCompare, 'bool');
        return (typeof refObjStructure == typeof objectToCompare);

    } else if (typeof refObjStructure == 'object') {
        if (Array.isArray(refObjStructure)) {
            if (!Array.isArray(objectToCompare)) {
                return false;
            }
            var index = objectToCompare.findIndex((item) => !compareObjects(refObjStructure[0], item))
            console.log(index);
            if (index > -1) {
                return false
            }

        } else {
            var isValid;
            for (key in refObjStructure) {
                isValid = compareObjects(refObjStructure[key], objectToCompare[key]);
                if (isValid === false) {
                    missingValue = key;
                    console.log('Missing value :', missingValue);
                    break
                }
            }
            if (isValid === false) {
                return false
            }
        }

    }
    // default:
    //     result = false
    //     break;
    // }
    return true
}