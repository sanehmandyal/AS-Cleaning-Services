import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { blogApi } from "../../services/blogApi";
import { Spinner, EmptyState } from "../../components/UIState";

const emptyForm = { title: "", image: "", excerpt: "", content: "", category: "Cleaning Tips", author: "AS Cleaning Services Team", published: false };

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    blogApi
      .getAll({ all: true })
      .then((res) => setBlogs(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Manage Blog | Admin | AS Cleaning Services";
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (b) => {
    setEditingId(b._id);
    setForm({
      title: b.title,
      image: b.image,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      author: b.author,
      published: b.published,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await blogApi.update(editingId, form);
        toast.success("Blog post updated.");
      } else {
        await blogApi.create(form);
        toast.success("Blog post created.");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (b) => {
    try {
      await blogApi.update(b._id, { published: !b.published });
      toast.success(!b.published ? "Post published." : "Post unpublished.");
      load();
    } catch (err) {
      toast.error("Failed to update blog post.");
    }
  };

  const confirmDelete = async () => {
    setSubmitting(true);
    try {
      await blogApi.remove(deleteId);
      toast.success("Blog post deleted.");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error("Failed to delete blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink">Manage Blog</h1>
        <button onClick={openCreate} className="btn-primary !py-2.5 !px-5 text-sm">
          <FaPlus size={12} /> New Post
        </button>
      </div>

      <div className="card p-6">
        {loading ? (
          <Spinner />
        ) : blogs.length === 0 ? (
          <EmptyState title="No blog posts yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/40 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">Title</th>
                  <th className="py-3 pr-4 font-medium">Category</th>
                  <th className="py-3 pr-4 font-medium">Author</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 font-medium text-ink max-w-xs truncate">{b.title}</td>
                    <td className="py-3 pr-4">{b.category}</td>
                    <td className="py-3 pr-4">{b.author}</td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => togglePublish(b)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                          b.published ? "bg-green-50 text-success" : "bg-gray-100 text-ink/50"
                        }`}
                      >
                        {b.published ? <FaEye size={10} /> : <FaEyeSlash size={10} />}
                        {b.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openEdit(b)} className="text-primary hover:text-primary-dark" aria-label="Edit post">
                          <FaEdit />
                        </button>
                        <button onClick={() => setDeleteId(b._id)} className="text-red-400 hover:text-red-600" aria-label="Delete post">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="bg-white rounded-xl2 p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-ink/40">
              <FaTimes />
            </button>
            <h3 className="font-display font-semibold text-lg text-ink mb-5">
              {editingId ? "Edit Blog Post" : "New Blog Post"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Featured Image URL</label>
                <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="https://..." />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Author</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Excerpt</label>
                <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input-field" placeholder="Short summary shown on the blog listing" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Content</label>
                <textarea required rows="8" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="input-field resize-none" />
              </div>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Publish immediately
              </label>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? "Saving..." : editingId ? "Update Post" : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-sm w-full">
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Delete Blog Post?</h3>
            <p className="text-sm text-ink/60 mb-6">This will permanently remove this post.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={confirmDelete}
                disabled={submitting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-4 disabled:opacity-60"
              >
                {submitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
