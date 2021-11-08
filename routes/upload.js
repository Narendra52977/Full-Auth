const router=require('express').Router()
const upload=require('../middlewares/uploadImage')
const uploadctrl=require('../controllers/uploadCtrl')
const auth=require('../middlewares/auth')

router.post('/upload_avatar',upload,auth,uploadctrl.uploadAvatar)
module.exports=router