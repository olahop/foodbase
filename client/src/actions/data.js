/* Action types */
export const REPLACE_DATA = 'REPLACE_DATA'


/* Action creators */
export function replaceData(new_data){
    return {
        type: REPLACE_DATA, 
        data: new_data
    }
}

