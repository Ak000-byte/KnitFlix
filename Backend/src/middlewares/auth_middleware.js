// const protect = (req,res,next) {
//     let token = null ;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
//         token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies && req.cookies.token) {
//         token = req.cookies.token;
//     }
// }