import { metadata, phrase_length } from '../metadata.json';
import { groupBy, min, indexOf } from 'lodash';

const { asr_word } = metadata;

const indexed_constant_length_phrases = {};

let word_index = 0;

while (word_index < asr_word.length) {
    let phrase_accumulator = [];
    while (phrase_accumulator.length < phrase_length) {
        phrase_accumulator.push(asr_word[word_index]);
        word_index += 1;
    }
    const start_timestamp_for_first_word = phrase_accumulator[0].start;
    const end_timestamp_for_last_word = phrase_accumulator[phrase_accumulator.length - 1].end;
    /*
        Two main changes from the last commit.
        1. We now have a constant length words in phrases, this improves the reading experiences for two good reasons
            1. The phrase length is more predictable.
            2. Instead of longer sentences in horizontal direction as the pace increases, we will now 
                have text scrolling faster in vertical direction. Since we are already doing that as part of 
                keeping track of previous and next sentence, less stress on eyes :) 
        2. The phrases are now indexed with timestamp at the middle of the sentence, this should fit well with 
            the algorithm below. As we calculate the phrase's distance from its midpoint we would have a much smoother 
            transition from one phrase to another. 
    */
    const mean_timestamp_for_phrase = (start_timestamp_for_first_word + end_timestamp_for_last_word) / 2;
    indexed_constant_length_phrases[mean_timestamp_for_phrase] = phrase_accumulator;
}

const groupedASRKeys = Object.keys(indexed_constant_length_phrases);

export default function ASRContainer({ timeStamp, setTimeStamp }) {

    const distance_array = groupedASRKeys.map(instant => Math.abs(timeStamp - instant));
    const minimum_distance = min(distance_array);
    const minimum_distance_index = indexOf(distance_array, minimum_distance);
    const sentence = (indexed_constant_length_phrases[groupedASRKeys[minimum_distance_index]]).map(elem => elem.word).join(" ");
    let previous_sentence, next_sentence;
    let previous_seek_point_timestamp, next_seek_point_timestamp;
    if (minimum_distance_index > 1) {
        previous_seek_point_timestamp = groupedASRKeys[minimum_distance_index - 1];
        previous_sentence = (indexed_constant_length_phrases[groupedASRKeys[minimum_distance_index - 1]]).map(elem => elem.word).join(" ");
    }
    if (minimum_distance_index < distance_array.length - 1) {
        next_seek_point_timestamp = groupedASRKeys[minimum_distance_index + 1];
        next_sentence = (indexed_constant_length_phrases[groupedASRKeys[minimum_distance_index + 1]]).map(elem => elem.word).join(" ");
    }
    return (
        <div className="h-full w-full flex flex-col justify-around items-center text-center">
            <div className="text-lg font-medium text-gray-600 cursor-pointer" onClick={() => setTimeStamp(previous_seek_point_timestamp)}>
                {previous_sentence}
            </div>
            <div className="text-xl font-semibold text-gray-800">
                {sentence}
            </div>
            <div className="text-lg font-medium text-gray-600 cursor-pointer" onClick={() => setTimeStamp(next_seek_point_timestamp)}>
                {next_sentence}
            </div>
        </div>
    )
}
