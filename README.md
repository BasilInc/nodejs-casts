NodeJS Casts App

This is an application written in Node.js that allows admins to post, share, and distribute screen cast tutorials of things.

# Features
 - Authentication
 - Post videos
 - Post code with syntax highlighting
 - Post README versions of casts
 - Post comments - allow users to comment on videos with Discus
 - Searching and Tagging

# Architecture
- Screencast
	- Name:string
	- Description:string
	- Video URL:string
	- README:string (markdown)
	- Summary:string (markdown)
	- Tags:String Array

- User
	- name:string
	- email:string
	- username:string
	- provider:string
	- hashed_password:string
	- salt:string 
	- facebook: Hash
	- twitter: Hash
	- github: Hash

# Tasks
## Erich
- [] Prettify front page
	- Better Styling
	- Thumbnails
	- Use Papercut

## Jason
- [] Configure Disqus 
- [] Refactor User model
	- Ensure tests are written
- [] Spruce up new page

## General
- [] Deploy to Heroku
- [] More Tests
	- Ensure Models are tested
	- Ensure Controllers are tested
	- Ensure utility function are tested
- [] Separate general users from admins
	- Admins are the only ones that can upload/edit videos
- [] Setup analytics
