import { AppDataSource } from './database/dbsource'
import { Student } from './database/entities/dbStudent'
import ConnectionPostgres from './database/dbconnection'

console.log('Inserting a new tweet into the database...')
const tweet = new Student()
tweet.id = 'id1'
tweet.Name = 'Johny'
tweet.Country = 'United States'

const repository = AppDataSource.getRepository(Student)
ConnectionPostgres.initServerConnection().then(() => meh())

const meh = async () => {
  await repository.save(tweet)
  console.log('Saved a new tweet with id: ' + tweet.id)

  console.log('Loading tweets from the database...')
  const tweets = await repository.find()
  console.log('Loaded tweets: ', tweets)
}
