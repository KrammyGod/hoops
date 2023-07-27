import { bookmarksHandler } from '@apis/bookmarks';
import protect from '@apis/protect';

export default protect(bookmarksHandler);
