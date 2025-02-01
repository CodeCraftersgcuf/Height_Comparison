import Link from "next/link"

const page = () => {
    return (
        <div className="py-8 lg:max-w-[75vw] mx-auto mb-10">
            <h1 className="text-center text-4xl font-bold my-10">About</h1>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold">About HeightComparison.com</h1>
                <p className="text-justify">Want to compare height between you and your favorite celebrity, or your loved ones? We've got you covered!</p>
                <p className="text-justify"><Link href="#">HeightComparison.com</Link> is the most accurate tool on the internet to compare height between people, or objects.</p>
                <p className="text-justify">Our intuitive comparison tool allows you to visualize how tall or short you would look in front of the people you choose to compare height with - no need to limit it to your imagination! Simply, enter the height of the person and silhouettes will be displayed on the height comparison chart.</p>
                <p className="text-justify">Comparing heights has been never been simpler and easier!</p>
                <h1 className="font-bold">How to use the tool</h1>
                <p className="text-justify">You can input height either in centimeters or in feet. The tool will automatically convert your input and display the result in both cm and feet. After entering the height, submit the 'Add Person' button to add a person to the chart.</p>
                <p className="text-justify">The left side of the height comparison chart is in cm while the right side of the chart is in feet.</p>
                <p className="text-justify">You can even set your preferred color for silhouettes. Drag the silhouette to move it in a different place of the chart.</p>
                <p className="text-justify">To edit a person's name or height, select the name of the person from the bottom left list.</p>
                <p className="text-justify">To remove a person from the chart, select the 'X' icon.</p>
                <p className="text-justify">You can add objects like a closet, couch, door, car, circle, and rectangle. The height of the circle and rectangle can be changed from the top left of the chart.</p>
            </div>
        </div>
    )
}

export default page
