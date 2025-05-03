import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom"; //  Added Link import

// Importing Material-UI components for styling and layout
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

// Importing icons for back navigation
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// DeleteAccount component for handling account deletion
export default function DeleteAccount() {

  // Using context to access authentication methods and user data  
  const { deleteAccount } = useContext(AuthContext);
  const navigate = useNavigate();

  // State variables for managing dialog visibility, loading state, and error messages
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handlers for opening and closing the confirmation dialog
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

    // Handler for confirming account deletion
  const handleConfirmDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await deleteAccount();
      navigate("/"); // Redirect after deletion
    } catch (err) {
      setError("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

    // Render the component
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6">
    
      <div className="z-10 bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl max-w-md w-full px-10 py-12 text-center space-y-6">
        {/* Back to Explorer link */}
      <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-blue-700 font-medium border border-blue-300 rounded-full bg-white hover:bg-blue-50 transition group focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            {/* Icon and text for back navigation */}
          <ArrowBackIosNewIcon
            fontSize="small"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Back to Explorer</span>
        </Link>
        {/* Header and description */}
        <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>
        <p className="text-gray-700">
          Permanently delete your account and all associated data, including your favorite countries.
        </p>


        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Delete Account button */}
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Delete My Account"}
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>

        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is permanent and cannot be undone. All your favorites and account data will be deleted.

          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
 
            <Button onClick={handleCloseDialog} color="primary" disabled={loading}>
                No, Keep My Account 
            </Button>

            <Button onClick={handleConfirmDelete} color="error" disabled={loading}>
                {loading ? "Deleting…" : "Yes, Delete"}
            </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
