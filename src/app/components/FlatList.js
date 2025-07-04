import Title from "./Title"
import FlatItem from "./FlatItem"

const FlatList = () => {
    const title = {
        text: "All Houses",
        description: "Lorem ipsum dolor sit ame"
    }
    return (
        <section className="section-all-re  max-auto">
            <div className="containe">
                <Title title={title.text} description={title.description} />
                <div className="flex flex-wrap gap-6 justify-center items-start  mx-auto">
                    <FlatItem slug="lorem-ipsum-1" />
                    <FlatItem slug="lorem-ipsum-2" />
                    <FlatItem slug="lorem-ipsum-3" />
                    <FlatItem slug="lorem-ipsum-4" />
                    <FlatItem slug="lorem-ipsum-5" />
                    <FlatItem slug="lorem-ipsum-6" />  
                    <FlatItem slug="lorem-ipsum-5" />
                    <FlatItem slug="lorem-ipsum-6" />  
                    <FlatItem slug="lorem-ipsum-5" />
                    
                </div>
            </div>
        </section>
    )

}

export default FlatList;
