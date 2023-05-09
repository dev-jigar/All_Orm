/**
 * @swagger
 * /api:
 *   get:
 *     summary: list users 
 *     responses:
 *       200:
 *         description: list comment sucessfully
 *       500:
 *         description: list comment failed
 * 
 */
/**
 * @swagger
 * /api/add:
 *   post:
 *     summary: Add users 
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: abc
 *                 userName:
 *                   type: string
 *                   example: xyz
 *                 email:
 *                   type: string
 *                   example: abc@gmail.com
 *                 password:
 *                   type: string
 *                   example: 12345678
 *                 country:
 *                   type: string
 *                   example: india
 *                 dateOfBirth:
 *                   type: string
 *                   example: dd/mm/yyyy
 *                 bio:
 *                   type: string
 *                   example: hello world
 *        
 *     responses:
 *          200:
 *            description: signup sucessfully
 *            content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                      responseCode:
 *                       type: integer
 *                       example: 200
 *                      responseMessage:
 *                        type: string
 *                        example: signup sucessfully
 *                      responseData:
 *                        type: object
 *                        properties:
 *                          token:
 *                              type: string
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1Y2I3NjAxZDg2OTJhZjkzMGVkMTkiLCJhY3Rpb24iOiJhY2Nlc3MiLCJpYXQiOjE2NDU1OTc4MTksImV4cCI6MTY0NTY0MTAxOX0.Zve63LUqIOh3lwhBfgQLbVE73PgbaY0tCPQ7y2vQVsk
 *          500:
 *            description: signup failed
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      responsecode:
 *                          type: integer
 *                      responseMessage:
 *                          type: string
 * 
 */