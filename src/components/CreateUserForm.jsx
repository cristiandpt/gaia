import React, { useState } from "react";

const CreateUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [urls, setUrls] = useState(["https://shadcn.com", "http://twitter.com/shadcn"]);

  const handleAddUrl = () => {
    setUrls([...urls, ""]);
  };

  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>

        <div
          data-orientation="horizontal"
          role="separator"
          className="shrink-0 bg-border h-[1px] w-full"
        />

        <form className="space-y-8">
          {/* Username field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="shadcn"
              id="username"
              name="username"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email
            </label>
            <select
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              id="email"
              name="email"
            >
              <option value="">Select a verified email to display</option>
              <option value="m@example.com">m@example.com</option>
              <option value="m@google.com">m@google.com</option>
              <option value="m@support.com">m@support.com</option>
            </select>
            <p className="text-[0.8rem] text-muted-foreground">
              You can manage verified email addresses in your{" "}
              <a href="/examples/forms">email settings</a>.
            </p>
          </div>

          {/* Bio field */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="bio">
              Bio
            </label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              placeholder="Tell us a little bit about yourself"
              name="bio"
              id="bio"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              You can <span>@mention</span> other users and organizations to
              link to them.
            </p>
          </div>

          {/* URLs field */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="urls">
              URLs
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              Add links to your website, blog, or social media profiles.
            </p>
            {urls.map((url, index) => (
              <input
                key={index}
                onChange={(e) =>
                  setUrls(
                    urls.map((u, i) => (i === index ? e.target.value : u))
                  )
                }
                value={url}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            ))}
            <button
              type="button"
              onClick={handleAddUrl}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-background h-8 rounded-md px-3 text-xs mt-2"
            >
              Add URL
            </button>
          </div>

          {/* Submit button */}
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            type="submit"
          >
            Update profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
