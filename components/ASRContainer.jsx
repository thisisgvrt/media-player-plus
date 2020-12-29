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
    let previous_sentence, next_sentence;
    if(minimum_distance_index > 1){
        previous_sentence = (groupedASR[groupedASRKeys[minimum_distance_index - 1]]).map(elem => elem.word).join(" ");
    }
    if(minimum_distance_index < distance_array.length - 1){
        next_sentence = (groupedASR[groupedASRKeys[minimum_distance_index + 1]]).map(elem => elem.word).join(" ");
    }
    return (
        <div className="h-full w-full flex flex-col justify-around items-center text-center">
            <div className="text-lg font-medium text-gray-600">
                {previous_sentence}
            </div>
            <div className="text-xl font-semibold text-gray-800">
                {sentence}
            </div>
            <div className="text-lg font-medium text-gray-600">
                {next_sentence}
            </div>
        </div>
    )
}
