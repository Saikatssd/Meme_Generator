import React, { useEffect } from 'react'

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    useEffect(() => {

        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
            
        }
        getMemes()

        // fetch("https://api.imgflip.com/get_memes")
        //     .then(res => res.json())
        //     .then(data => setAllMemes(data.data.memes))

    }, [])

    function getMemeImage() {
        // const memesArray = allMemes.data.memes
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <div>
            <main>
                <div className='form'>
                    <input type="text" className='form-input' placeholder='Top Text' name='topText' value={meme.topText} onChange={handleChange} />
                    <input type="text" className='form-input' placeholder='Bottom Text' name='bottomText' value={meme.bottomText} onChange={handleChange} />
                    <button className='form-btn' onClick={getMemeImage}>Get a new meme image 🌆 </button>
                </div>
                <div className="meme">
                    <img src={meme.randomImage} className="meme-image" alt="" />
                    <h2 className='meme-text top'>{meme.topText}</h2>
                    <h2 className='meme-text bottom'>{meme.bottomText}</h2>
                </div>
            </main>
        </div>
    )
}
