import { createRouter } from "@/utils/server/create-router";
import { FakePostsController } from "@/server/fake/v1/posts/posts.controller";

const fakePosts = createRouter();

fakePosts.get("/", FakePostsController.handleGetPosts);
fakePosts.post("/", FakePostsController.handlePostPosts);

fakePosts.get("/:id", FakePostsController.handleGetPostsById);
fakePosts.put("/:id", FakePostsController.handlePutPostsById);
fakePosts.patch("/:id", FakePostsController.handlePatchPostsById);
fakePosts.delete("/:id", FakePostsController.handleDeletePostsById);

export default fakePosts;
