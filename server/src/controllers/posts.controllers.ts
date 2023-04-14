import { Request, Response } from 'express';
import { Post } from '../entities/Post';

export const getPosts = async (req: Request, res: Response) => {

    try {
        const posts = await Post.find();
        return res.json(posts);

    } catch(error) {
        if(error instanceof Error){
            return res.json(error.message);
        }
    }
}

export const createPost = async (req: Request, res: Response) => {

    try {
        const { name, description } = req.body;
        
        const post = new Post();
        post.name = name;
        post.description = description;

        await post.save();

        res.send(post);

    } catch(error) {
        if(error instanceof Error){
            return res.json(error.message);
        }        
    }    
}

export const updatePost = async (req: Request, res: Response) => {

    try{

        const { id } = req.params;

        const post = await Post.findOneBy({id: parseInt(id)});

        if(!post) return res.status(404).json({message: 'Post does not exist'});

        await Post.update(
            {id: parseInt(id)},
            req.body
        );    
        return res.status(204);

    } catch (error) {
        if(error instanceof Error){
            return res.json(error.message);
        } 
    }
}

export const deletePost = async (req: Request, res: Response) => {

    try{

        const { id } = req.params;

        const post = await Post.findOneBy({id: parseInt(id)});

        if(!post) return res.status(404).json({message: 'Post does not exist'});

        const result = await Post.delete({id: parseInt(id)});

        console.log(result);

        return res.json(post);

    } catch (error) {
        if(error instanceof Error){
            return res.json(error.message);
        } 
    }

}