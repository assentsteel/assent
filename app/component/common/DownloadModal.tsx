"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileLabel: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DownloadModal = ({ isOpen, onClose, fileUrl, fileLabel }: DownloadModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/file-downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), fileName: fileLabel, fileUrl }),
      });

      if (response.ok) {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setName("");
        setEmail("");
        handleClose();
      } else {
        setError("Something went wrong, please try again");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[15px] w-full max-w-[440px] p-6 md:p-8 relative text-primary"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 text-2xl leading-none text-[#595959] hover:text-primary cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-md font-[600] mb-1">Download {fileLabel}</h3>
            <p className="text-xs text-[#595959] mb-6">
              Please share your details to access the file.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-1 appearance-none bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black text-[#595959] text-xs py-2 pr-6 w-full placeholder:text-[#595959]"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-1 appearance-none bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black text-[#595959] text-xs py-2 pr-6 w-full placeholder:text-[#595959]"
              />

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="border border-secondary py-2 px-4 rounded-full hover:bg-secondary hover:text-primary h-[48px] transition-all ease-in-out duration-500 disabled:opacity-60 disabled:cursor-not-allowed uppercase text-xs font-[500]"
              >
                {loading ? "Please wait..." : "Download"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;
