import { metadata, asr_agg_threshold } from '../metadata.json';
import { groupBy, min, indexOf } from 'lodash';

const { asr_word } = metadata;

const groupedASR = groupBy(asr_word, elem => (elem.start - (elem.start % asr_agg_threshold)));
const groupedASRKeys = Object.keys(groupedASR);

export default function ASRContainer({ timeStamp }) {
    
    const distance_array = groupedASRKeys.map(instant => Math.abs(timeStamp - instant));
    const minimum_distance = min(distance_array);
    const minimum_distance_index = indexOf(distance_array, minimum_distance);
    const sentence = (groupedASR[groupedASRKeys[minimum_distance_index]]).map(elem => elem.word).join(" ");
    return (
        <div className="flex flex-col justify-center items-center bg-grey-lighter">
            <div>
                {sentence}
            </div>
        </div>
    )
}
