import { Message } from "../models/message.models.js"
import { Story } from "../models/story.models.js"
import { uploadToCloudinary } from "../utils/cloudinary.utils.js"

const addStory = async(req, res) =>{
    const {title, authorId} = req.body
    try {
        let media_url = null
        let media_type = null

        if(req.file){
            const {url, resource_type} = await uploadToCloudinary(req.file.path)
            media_url = url
            media_type = resource_type
        }
        const story = new Story({title, authorId, media_url, media_type})
        const saveStory = await story.save()

        return res.status(200).json({saveStory,Message: "story created"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "interal srver error"})
    }
}

export {addStory}