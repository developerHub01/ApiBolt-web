import { router } from "@/server/routes/registry";

router.get("/", (c) =>
  c.json({
    message: "status route",
  }),
);

export default router;
