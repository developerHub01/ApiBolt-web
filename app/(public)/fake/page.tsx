import * as motion from "motion/react-client";
import { SITE_URL } from "@/constant/index.constant";
import EndpointCard from "@/components/app/public/fake/EndpointCard";

const apiBaseUrl = `${SITE_URL}/fake/v1`;

const usersExample = JSON.stringify(
  {
    data: [
      {
        id: 1,
        username: "user",
        role: "admin",
      },
    ],
    meta: {
      total: 100,
    },
  },
  null,
  2,
);

const userExample = JSON.stringify(
  {
    id: 1,
    username: "user",
    email: "test@example.com",
  },
  null,
  2,
);
const postsExample = JSON.stringify(
  {
    data: [
      {
        id: 1,
        title: "Test Post",
        userId: 1,
      },
    ],
    meta: {
      total: 50,
    },
  },
  null,
  2,
);

const Page = () => {
  return (
    <div className="space-y-24">
      <motion.section
        id="users"
        initial={{
          opacity: 0,
          y: 32,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-15% 0px 0px 0px",
        }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0.33, 0, 0.2, 1],
        }}
      >
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-4xl font-black font-brand text-white">USERS</h2>
          <span className="font-mono text-xs text-muted-foreground">
            /users
          </span>
        </div>
        <div className="grid gap-3">
          <EndpointCard
            method="GET"
            path="/fake/v1/users"
            description="Get paginated list."
            params={["page", "limit"]}
            example={usersExample}
          />
          <EndpointCard
            method="GET"
            path="/fake/v1/users/{id}"
            description="Get user details."
            params={["id"]}
            example={userExample}
          />
          <EndpointCard
            method="POST"
            path="/fake/v1/users"
            description="Create user."
          />
          <EndpointCard
            method="PUT"
            path="/fake/v1/users/{id}"
            description="Update user."
          />
          <EndpointCard
            method="PATCH"
            path="/fake/v1/users/{id}"
            description="Patch user."
          />
          <EndpointCard
            method="DELETE"
            path="/fake/v1/users/{id}"
            description="Remove user."
          />
        </div>
      </motion.section>

      <motion.section
        id="posts"
        initial={{
          opacity: 0,
          y: 32,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-15% 0px 0px 0px",
        }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.33, 0, 0.2, 1],
        }}
      >
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-4xl font-black font-brand text-white">POSTS</h2>
          <span className="font-mono text-xs text-muted-foreground">
            /posts
          </span>
        </div>
        <div className="grid gap-3">
          <EndpointCard
            method="GET"
            path="/fake/v1/posts"
            description="Get feed."
            params={["page", "limit"]}
            example={postsExample}
          />
          <EndpointCard
            method="GET"
            path="/fake/v1/posts/{id}"
            description="Get single post."
            params={["id"]}
          />
          <EndpointCard
            method="POST"
            path="/fake/v1/posts"
            description="Publish post."
          />
          <EndpointCard
            method="PUT"
            path="/fake/v1/posts/{id}"
            description="Edit post."
          />
          <EndpointCard
            method="DELETE"
            path="/fake/v1/posts/{id}"
            description="Delete post."
          />
        </div>
      </motion.section>

      <motion.section
        id="products"
        initial={{
          opacity: 0,
          y: 32,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-15% 0px 0px 0px",
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.33, 0, 0.2, 1],
        }}
      >
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-4xl font-black font-brand text-white">
            PRODUCTS
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            /products
          </span>
        </div>
        <div className="grid gap-3">
          <EndpointCard
            method="GET"
            path="/fake/v1/products"
            description="Catalog list."
            params={["page", "category"]}
          />
          <EndpointCard
            method="GET"
            path="/fake/v1/products/{id}"
            description="Product details."
            params={["id"]}
          />
          <EndpointCard
            method="PATCH"
            path="/fake/v1/products/{id}"
            description="Update stock."
          />
          <EndpointCard
            method="DELETE"
            path="/fake/v1/products/{id}"
            description="Remove product."
          />
        </div>
      </motion.section>

      <motion.section
        id="orders"
        initial={{
          opacity: 0,
          y: 32,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-15% 0px 0px 0px",
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.33, 0, 0.2, 1],
        }}
      >
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-4xl font-black font-brand text-white">ORDERS</h2>
          <span className="font-mono text-xs text-muted-foreground">
            /orders
          </span>
        </div>
        <div className="grid gap-3">
          <EndpointCard
            method="GET"
            path="/fake/v1/orders"
            description="Order history."
            params={["page"]}
          />
          <EndpointCard
            method="GET"
            path="/fake/v1/orders/{id}"
            description="Order details."
            params={["id"]}
          />
          <EndpointCard
            method="PUT"
            path="/fake/v1/orders/{id}"
            description="Update status."
          />
        </div>
      </motion.section>

      <motion.section
        id="categories"
        initial={{
          opacity: 0,
          y: 32,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-15% 0px 0px 0px",
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0.33, 0, 0.2, 1],
        }}
      >
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-4xl font-black font-brand text-white">
            CATEGORIES
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            /categories
          </span>
        </div>
        <div className="grid gap-3">
          <EndpointCard
            method="GET"
            path="/fake/v1/categories"
            description="All categories."
          />
          <EndpointCard
            method="GET"
            path="/fake/v1/categories/{id}"
            description="Single category."
          />
          <EndpointCard
            method="DELETE"
            path="/fake/v1/categories/{id}"
            description="Delete category."
          />
        </div>
      </motion.section>

      <motion.section
        id="status"
        initial={{
          opacity: 0,
          y: 32,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-15% 0px 0px 0px",
        }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0.33, 0, 0.2, 1],
        }}
      >
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-4xl font-black font-brand text-white">STATUS</h2>
          <span className="font-mono text-xs text-muted-foreground">
            /status
          </span>
        </div>
        <div className="p-6 bg-secondary/10 border border-white/5 rounded-lg flex items-center justify-between">
          <code className="text-sm font-mono text-foreground">
            GET {apiBaseUrl}/status
          </code>
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-bold uppercase tracking-wider">
            Operational
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Page;
