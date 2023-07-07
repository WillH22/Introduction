"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

class Story {
  constructor({ storyId, title, author, url, username, createdAt }) {
    Object.assign(this, { storyId, title, author, url, username, createdAt });
  }

  getHostName() {
    return new URL(this.url).hostname;
  }
}

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  static async getStories() {
    const response = await axios.get(`${BASE_URL}/stories`);
    const stories = response.data.stories.map((story) => new Story(story));
    return new StoryList(stories);
  }

  async addStory(user, { title, author, url }) {
    const token = user.loginToken;
    const response = await axios.post(`${BASE_URL}/stories`, {
      token,
      story: { title, author, url },
    });
    const story = new Story(response.data.story);
    this.stories.unshift(story);
    user.ownStories.unshift(story);
    return story;
  }

  async removeStory(user, storyId) {
    const token = user.loginToken;
    await axios.delete(`${BASE_URL}/stories/${storyId}`, { data: { token } });
    this.stories = this.stories.filter((s) => s.storyId !== storyId);
    user.ownStories = user.ownStories.filter((s) => s.storyId !== storyId);
    user.favorites = user.favorites.filter((s) => s.storyId !== storyId);
  }
}

class User {
  constructor(
    { username, name, createdAt, favorites = [], ownStories = [] },
    token
  ) {
    Object.assign(this, {
      username,
      name,
      createdAt,
      favorites: favorites.map((s) => new Story(s)),
      ownStories: ownStories.map((s) => new Story(s)),
      loginToken: token,
    });
  }

  static async signup(username, password, name) {
    const response = await axios.post(`${BASE_URL}/signup`, {
      user: { username, password, name },
    });
    const { user } = response.data;
    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories,
      },
      response.data.token
    );
  }

  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, {
      user: { username, password },
    });
    const { user } = response.data;
    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories,
      },
      response.data.token
    );
  }

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios.get(`${BASE_URL}/users/${username}`, {
        params: { token },
      });
      const { user } = response.data;
      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories,
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  async addFavorite(story) {
    this.favorites.push(story);
    await this._addOrRemoveFavorite("add", story);
  }

  async removeFavorite(story) {
    this.favorites = this.favorites.filter((s) => s.storyId !== story.storyId);
    await this._addOrRemoveFavorite("remove", story);
  }

  async _addOrRemoveFavorite(newState, story) {
    const method = newState === "add" ? "POST" : "DELETE";
    const token = this.loginToken;
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
      method,
      data: { token },
    });
  }

  isFavorite(story) {
    return this.favorites.some((s) => s.storyId === story.storyId);
  }
}
