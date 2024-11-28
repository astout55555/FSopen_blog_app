import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog';

describe('<Blog />', () => {
  let container;

  const testUser = {
    id: 'xyz',
    name: 'Test User',
    username: 'username',
  };

  const testBlog = {
    id: 'abc',
    title: 'Test Title',
    author: 'Test Author',
    likes: 0,
    user: testUser,
    url: 'www.testurl.com',
  };

  const mockUser = userEvent.setup();

  const mockSetBlogs = vi.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={testBlog} user={testUser} setBlogs={mockSetBlogs} />
    ).container
  })

  test('renders title and author', () => {
    const basicDetails = container.querySelector('.blogBasicDetails');
    expect(basicDetails).toHaveTextContent('Test Title Test Author');
  })

  test('does not initially render likes or url', () => {
    const basicDetails = container.querySelector('.blogBasicDetails');
    expect(basicDetails).not.toHaveTextContent('www.testurl.com');
    expect(basicDetails).not.toHaveTextContent('likes');

    const likeButton = container.querySelector('.likeButton');
    const otherDetails = likeButton.parentElement;
    expect(otherDetails).toHaveStyle('display: none');
  })

  test('url and likes visible after clicking view button', async () => {
    const otherDetails = container.querySelector('.likeButton').parentElement;
    const viewButton = screen.getByText('view');
    await mockUser.click(viewButton);
    expect(otherDetails).not.toHaveStyle('display: none');
  });
});
