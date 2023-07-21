import { usersHandler } from "../../../apis/users";
import protect from '../../../apis/protect';

export default protect(usersHandler);
