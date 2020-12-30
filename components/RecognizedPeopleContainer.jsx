import { metadata } from '../metadata.json';

const { recognized_people } = metadata;

export default function RecognizedPeopleContainer({ timeStamp }) {

    const filtered_people_list = recognized_people.filter(people_info => (timeStamp < people_info.end && timeStamp > people_info.start))

    console.log(filtered_people_list.length);

    const getCardMarkup = (name) => {
        return (
            <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 my-4">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                </div>
                <div class="flex-1 min-w-0">
                    <a href="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        <p class="text-sm font-medium text-gray-900">
                            {name}
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            Description from other table
                        </p>
                    </a>
                </div>
            </div>
        )
    }
    return (
        <div className="h-full w-full flex flex-col items-center text-center">
            {filtered_people_list.map(person => getCardMarkup(person.speaker_name))}
        </div>
    )
}
