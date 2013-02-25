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
- Erich
	- Add screencast model
	- Create main video page (Jason to provide feedback/input)
- Jason
	- Create functionality to handle markdown parsing
	- Discus Integration
	- Angular.js
- Everyone
	- Write Tests
