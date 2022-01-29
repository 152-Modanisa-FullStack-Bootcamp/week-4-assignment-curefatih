import { pactWith } from "jest-pact";
import { Matchers } from "@pact-foundation/pact";
import { API } from "@/api";

const { eachLike, like } = Matchers;
pactWith(
  {
    consumer: "Frontend",
    provider: "Backend",
  },
  (provider) => {
    describe("videos", () => {
      let api;
      beforeEach(() => {
        api = new API(provider.mockService.baseUrl);
      });

      test("get video list", async () => {
        await provider.addInteraction({
          state: "get video list",
          uponReceiving: "request for videos",
          withRequest: {
            method: "GET",
            path: "/videos",
          },
          willRespondWith: {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: {
              data: eachLike({
                id: like(1),
                videoAddress: like(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                ),
                coverImage: like(
                  "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                ),
                hoverImage: like(
                  "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                ),
                title: like("The Best Video"),
                viewCount: like(1),
                publishDateInMonth: like(1),
                ownerImage: like(
                  "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                ),
                ownerName: like("John Doe"),
                description: like(
                  "This is the best video ever. I hope you like it."
                ),
              }),
            },
          },
        });
        const res = await api.getVideoList();
        console.log(res);
      });
    });
  }
);
