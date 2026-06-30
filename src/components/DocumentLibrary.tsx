import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  File,
  Plus,
  Trash2,
  Download,
  Search,
  BookOpen,
  X,
  Save,
  Edit3,
  UploadCloud,
  FileImage,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  Server
} from "lucide-react";
import { BackendDocument } from "../types";
import MathRenderer from "./MathRenderer";
import { auth, googleAuthProvider, db } from "../lib/firebase.ts";
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";

export default function DocumentLibrary() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const [documents, setDocuments] = useState<BackendDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<"all" | "note" | "file">("all");

  // View state
  const [selectedDoc, setSelectedDoc] = useState<BackendDocument | null>(null);

  // Editor state for creating/editing custom notes
  const [isCreatingNote, setIsCreatingNote] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // File Upload state
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      if (currentUser) {
        fetchDocuments(currentUser);
      } else {
        setDocuments([]);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch documents from secure backend
  const fetchDocuments = async (currentUser: FirebaseUser) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const q = query(collection(db, "documents"), where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      const docsList: BackendDocument[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        docsList.push({
          id: docSnap.id,
          name: data.name,
          type: data.type as "file" | "note",
          fileType: data.fileType,
          size: data.size,
          content: data.content,
          createdAt: data.createdAt
        });
      });
      setDocuments(docsList);
    } catch (err: any) {
      console.error("Error fetching documents:", err);
      setErrorMsg(err.message || "មានបញ្ហាក្នុងការទាញយកឯកសារពី Backend");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login Handler
  const handleLogin = async () => {
    setErrorMsg(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setSuccessMsg("បានចូលប្រើប្រាស់ជោគជ័យ! (Logged in successfully!)");
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMsg("ការចូលប្រើប្រាស់គណនីបានបរាជ័យ (Authentication failed): " + err.message);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSuccessMsg("បានចេញពីគណនីជោគជ័យ! (Logged out successfully!)");
      setSelectedDoc(null);
      setIsCreatingNote(false);
    } catch (err: any) {
      console.error("Logout failed:", err);
    }
  };

  // Clear messages after timeout
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  // Handle Drag-and-drop file upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileUpload(e.target.files[0]);
    }
  };

  // Upload file utility
  const handleFileUpload = async (file: File) => {
    if (!user) return;

    // Firestore 1MB limit check to prevent database write errors
    if (file.size > 1 * 1024 * 1024) {
      setErrorMsg("ឯកសារធំពេកហើយ! ដោយសារតែការកំណត់របស់ Database ទំហំអតិបរមាគឺ 1MB (File is too large! Due to Database limits, maximum limit is 1MB)");
      return;
    }

    setIsUploading(true);
    setErrorMsg(null);

    const reader = new FileReader();

    const isImage = file.type.startsWith("image/");
    const isText = file.type.startsWith("text/") || file.name.endsWith(".txt") || file.name.endsWith(".md");

    reader.onload = async (event) => {
      try {
        const result = event.target?.result;
        if (!result) throw new Error("មិនអាចអានឯកសារបានទេ (Failed to read file)");

        const docRef = doc(collection(db, "documents"));
        const newDocPayload = {
          userId: user.uid,
          name: file.name,
          type: "file" as "file" | "note",
          fileType: file.type || "application/octet-stream",
          size: file.size,
          content: result.toString(),
          createdAt: new Date().toISOString()
        };
        await setDoc(docRef, newDocPayload);

        const newDoc: BackendDocument = { 
          id: docRef.id, 
          name: newDocPayload.name,
          type: newDocPayload.type,
          fileType: newDocPayload.fileType,
          size: newDocPayload.size,
          content: newDocPayload.content,
          createdAt: newDocPayload.createdAt
        };
        setDocuments((prev) => [newDoc, ...prev]);
        setSuccessMsg("បានរក្សាទុកឯកសារជោគជ័យ! (File saved successfully on the backend!)");
      } catch (err: any) {
        console.error("Error saving uploaded file:", err);
        setErrorMsg(err.message || "មានកំហុសក្នុងការរក្សាទុកឯកសារ");
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setErrorMsg("កំហុសក្នុងការអានឯកសារពីកុំព្យូទ័ររបស់អ្នក (Error reading file from your local system)");
      setIsUploading(false);
    };

    if (isImage) {
      reader.readAsDataURL(file);
    } else if (isText) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  // Save custom markdown notes to backend
  const handleSaveNote = async () => {
    if (!user) return;
    if (!noteTitle.trim()) {
      setErrorMsg("សូមបញ្ចូលចំណងជើងកំណត់ត្រា (Please enter a note title)");
      return;
    }
    if (!noteContent.trim()) {
      setErrorMsg("សូមសរសេរខ្លឹមសារកំណត់ត្រា (Please write some content)");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      const contentSize = new Blob([noteContent]).size;
      if (contentSize > 1 * 1024 * 1024) {
        setErrorMsg("កំណត់ត្រាធំពេកហើយ! ដោយសារតែការកំណត់របស់ Database ទំហំអតិបរមាគឺ 1MB (Note is too large! Due to Database limits, maximum limit is 1MB)");
        setIsSaving(false);
        return;
      }

      const docRef = doc(collection(db, "documents"));
      const newDocPayload = {
        userId: user.uid,
        name: noteTitle,
        type: "note" as "file" | "note",
        fileType: "text/markdown",
        size: contentSize,
        content: noteContent,
        createdAt: new Date().toISOString()
      };
      await setDoc(docRef, newDocPayload);

      const newDoc: BackendDocument = { 
        id: docRef.id,
        name: newDocPayload.name,
        type: newDocPayload.type,
        fileType: newDocPayload.fileType,
        size: newDocPayload.size,
        content: newDocPayload.content,
        createdAt: newDocPayload.createdAt
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setSuccessMsg("បានរក្សាទុកកំណត់ត្រាជោគជ័យ! (Note saved successfully on the backend!)");

      setIsCreatingNote(false);
      setNoteTitle("");
      setNoteContent("");
    } catch (err: any) {
      console.error("Error saving note:", err);
      setErrorMsg(err.message || "មានកំហុសក្នុងការរក្សាទុកកំណត់ត្រា");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete a document from backend
  const handleDeleteDoc = async (id: string, name: string) => {
    if (!user) return;
    if (
      !confirm(
        `តើអ្នកពិតជាចង់លុបឯកសារ "${name}" ពីម៉ាស៊ីនមេមែនទេ? \n(Are you sure you want to delete this document from the backend?)`
      )
    ) {
      return;
    }

    setErrorMsg(null);
    try {
      await deleteDoc(doc(db, "documents", id));

      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      if (selectedDoc?.id === id) {
        setSelectedDoc(null);
      }
      setSuccessMsg("បានលុបឯកសារជោគជ័យ! (Document deleted successfully from backend!)");
    } catch (err: any) {
      console.error("Error deleting document:", err);
      setErrorMsg(err.message || "មានកំហុសក្នុងការលុបឯកសារ");
    }
  };

  // Format file size
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Trigger file download helper
  const handleDownloadFile = (doc: BackendDocument) => {
    try {
      const link = document.createElement("a");
      link.href = doc.content;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      const blob = new Blob([doc.content], { type: doc.fileType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Filter and search logic
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  // Auth Loading State
  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 bg-black/10 rounded-2xl border border-white/5 text-slate-100 min-h-[400px]">
        <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
        <span className="text-xs font-sans text-slate-400">កំពុងពិនិត្យមើលស្ថានភាពគណនី... (Checking Auth State...)</span>
      </div>
    );
  }

  // Not Logged In Screen
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-black/20 rounded-2xl border border-white/5 text-slate-100 min-h-[480px] max-w-4xl mx-auto" id="unauthenticated-state">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#ff4e00]/20 to-[#ff8c00]/20 border border-[#ff4e00]/30 flex items-center justify-center text-[#ff4e00] mb-6 shadow-xl shadow-[#ff4e00]/5">
          <BookOpen className="w-8 h-8" />
        </div>
        
        <h2 className="font-sans font-extrabold text-xl md:text-2xl text-white tracking-tight">
          បណ្ណាល័យរក្សាទុកឯកសារនៅលើ Cloud SQL & Firebase
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-lg mt-3 leading-relaxed font-sans">
          សូមចូលប្រើប្រាស់គណនីរបស់អ្នកតាមរយៈ <span className="text-orange-400 font-semibold">Google Sign-In</span> ដើម្បីរក្សាទុកឯកសារ រូបមន្តគណិតវិទ្យា និងកំណត់ត្រាសំខាន់ៗរបស់អ្នកនៅលើប្រព័ន្ធ Cloud SQL Database ដោយសុវត្ថិភាព។
        </p>

        {errorMsg && (
          <div className="mt-6 bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-sans max-w-md">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          onClick={handleLogin}
          className="mt-8 flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-sans font-bold bg-white text-slate-900 hover:bg-slate-100 transition shadow-lg shadow-white/5 transform active:scale-95 duration-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>ចូលជាមួយ Google (Sign in with Google)</span>
        </button>

        <div className="flex items-center gap-6 mt-12 text-[10px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure Firebase Auth
          </span>
          <span className="flex items-center gap-1">
            <Server className="w-3.5 h-3.5 text-blue-500" /> PostgreSQL Cloud SQL
          </span>
        </div>
      </div>
    );
  }

  // Logged In Screen
  return (
    <div className="flex flex-col h-full bg-black/10 rounded-2xl border border-white/5 p-4 md:p-6 text-slate-100" id="document-library-root">
      
      {/* Top Header Logged In User bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-white/10"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <User className="w-5 h-5" />
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5">
              {user.displayName || "អ្នកប្រើប្រាស់"}
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 text-[8px] font-mono font-bold tracking-wider">ONLINE</span>
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold border border-white/10 hover:border-white/20 hover:bg-white/5 transition text-slate-400 hover:text-white"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>ចាកចេញ (Sign Out)</span>
        </button>
      </div>

      {/* Notifications bar */}
      {errorMsg && (
        <div className="mb-4 bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2.5 text-xs font-sans">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl flex items-center gap-2.5 text-xs font-sans">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="ml-auto text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: List left, Viewer or Editor right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Documents List & Controls) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <h3 className="font-sans font-bold text-white text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ff4e00]" />
                បណ្ណាល័យឯកសាររបស់ខ្ញុំ (My Document Backend Storage)
              </h3>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                ឯកសារ និងកំណត់ត្រាទាំងអស់ត្រូវបានរក្សាទុកដោយសុវត្ថិភាពនៅលើម៉ាស៊ីនមេ (Backend Server)
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsCreatingNote(true);
                  setSelectedDoc(null);
                  setNoteTitle("");
                  setNoteContent("");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:opacity-90 transition text-white shadow-md shadow-[#ff4e00]/15"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>បង្កើតកំណត់ត្រ</span>
              </button>
            </div>
          </div>

          {/* Search, Filter Tabs and Drag&Drop */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex gap-2">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="ស្វែងរកឯកសារ... (Search documents...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition font-sans"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex bg-black/40 p-0.5 rounded-xl border border-white/10">
                {(["all", "note", "file"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-sans font-bold transition ${
                      filterType === t
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t === "all" ? "ទាំងអស់" : t === "note" ? "កំណត់ត្រា" : "ឯកសារឡើង"}
                  </button>
                ))}
              </div>
            </div>

            {/* Drag & Drop Upload Stage */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
                dragActive
                  ? "border-[#ff4e00] bg-orange-500/5"
                  : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="*/*"
              />
              {isUploading ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                  <span className="text-[10px] font-sans text-slate-400">កំពុងរក្សាទុកឯកសារនៅលើម៉ាស៊ីនមេ... (Uploading to backend...)</span>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-7 h-7 text-orange-400/80" />
                  <span className="text-[11px] font-sans text-slate-200 font-medium">
                    អូស និងទម្លាក់ឯកសារគណិតវិទ្យាទីនេះ ឬ ចុចដើម្បីរក្សាទុកឡើងទៅ Backend
                  </span>
                  <span className="text-[9px] font-sans text-slate-500">
                    គាំទ្រ រូបភាព, លំហាត់ PDF, TXT, កំណត់ត្រា (ទំហំអតិបរមា 10MB)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Documents Grid / List */}
          <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 bg-white/5 rounded-xl border border-white/10">
                <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                <span className="text-xs font-sans text-slate-400">កំពុងភ្ជាប់ទាញយកឯកសារពី Backend...</span>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2 bg-white/5 rounded-xl border border-white/10 text-center px-4">
                <File className="w-8 h-8 text-slate-600 mb-1" />
                <span className="text-xs font-sans font-semibold text-slate-400">រកមិនឃើញឯកសារទេ (No documents found)</span>
                <span className="text-[10px] font-sans text-slate-500 max-w-sm">
                  មិនទាន់មានឯកសារនៅលើ Backend ឡើយ។ សូមចុចប៊ូតុង "បង្កើតកំណត់ត្រា" ឬបោះឯកសារឡើង ដើម្បីរក្សាទុកឯកសារគណិតវិទ្យាដំបូងរបស់អ្នក!
                </span>
              </div>
            ) : (
              filteredDocuments.map((doc) => {
                const isNote = doc.type === "note";
                const isImg = doc.fileType.startsWith("image/");
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoc(doc);
                      setIsCreatingNote(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer text-left ${
                      selectedDoc?.id === doc.id
                        ? "bg-orange-500/10 border-orange-500/40 shadow-md shadow-[#ff4e00]/5"
                        : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isNote 
                          ? "bg-blue-500/10 text-blue-400" 
                          : isImg 
                          ? "bg-emerald-500/10 text-emerald-400" 
                          : "bg-purple-500/10 text-purple-400"
                      }`}>
                        {isNote ? (
                          <FileText className="w-4 h-4" />
                        ) : isImg ? (
                          <FileImage className="w-4 h-4" />
                        ) : (
                          <File className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-sans font-bold text-white truncate max-w-[200px] sm:max-w-[320px]">
                          {doc.name}
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono mt-0.5">
                          <span className={`px-1.5 py-0.2 rounded-full font-bold ${
                            isNote ? "bg-blue-500/10 text-blue-300" : "bg-emerald-500/10 text-emerald-300"
                          }`}>
                            {isNote ? "Note" : "File"}
                          </span>
                          <span>•</span>
                          <span>{formatBytes(doc.size)}</span>
                          <span>•</span>
                          <span>{new Date(doc.createdAt).toLocaleDateString("km-KH", { day: "numeric", month: "short" })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoc(doc);
                          setIsCreatingNote(false);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                        title="មើលខ្លឹមសារ"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      
                      {!isNote && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadFile(doc);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                          title="ទាញយកឯកសារ"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDoc(doc.id, doc.name);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition"
                        title="លុបឯកសារ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (Viewer or Editor Panel) */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col gap-4 shadow-xl backdrop-blur-sm min-h-[460px]">
          
          {/* 1. Default welcome state */}
          {!isCreatingNote && !selectedDoc && (
            <div className="flex flex-col items-center justify-center text-center py-20 my-auto gap-3 text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-1">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-sans font-bold text-sm text-white">ផ្ទាំងបង្ហាញលម្អិត (Document Workspace)</h4>
              <p className="text-[10px] max-w-xs font-sans">
                សូមជ្រើសរើសឯកសារណាមួយពីបញ្ជីខាងឆ្វេង ដើម្បីមើល បង្ហាញរូបមន្ត បទបង្ហាញ ឬបង្កើតកំណត់ត្រាគណិតវិទ្យាថ្មី។
              </p>
            </div>
          )}

          {/* 2. Custom Note Editor */}
          {isCreatingNote && (
            <div className="flex flex-col gap-3 h-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="font-sans font-bold text-xs text-orange-400 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  បង្កើតកំណត់ត្រាគណិតវិទ្យាថ្មី
                </h4>
                <button
                  onClick={() => setIsCreatingNote(false)}
                  className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Note Title */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-sans">ប្រធានបទ / ចំណងជើងកំណត់ត្រា</label>
                <input
                  type="text"
                  placeholder="ឧទាហរណ៍៖ រូបមន្តលីមីតពិសេសរបស់ខ្ញុំ"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500/50 transition font-sans"
                />
              </div>

              {/* Helper guide */}
              <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-2 text-[9px] text-slate-300 font-sans leading-relaxed">
                <span className="font-bold text-orange-400">របៀបសរសេរ LaTeX ៖</span> ប្រើប្រាស់ <code className="bg-black/40 px-1 py-0.2 rounded text-orange-300">{"$a + bi$"}</code> សម្រាប់រូបមន្តតូចៗ ឬ <code className="bg-black/40 px-1 py-0.2 rounded text-orange-300">{"$$\\lim_{x \\to 0}$$"}</code> សម្រាប់រូបមន្តធំៗនៅចំកណ្តាល។
              </div>

              {/* Note Content and Live Preview Tabs */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-slate-400 font-sans">សរសេរអត្ថបទ (គាំទ្រ Markdown & LaTeX)</label>
                </div>
                
                <textarea
                  placeholder="សរសេរខ្លឹមសារគណិតវិទ្យានៅទីនេះ...&#10;&#10;ឧទាហរណ៍៖&#10;### រូបមន្តកុំផ្លិចសំខាន់ៗ&#10;ម៉ូឌុល៖ $|z| = \sqrt{a^2 + b^2}$&#10;ទម្រង់ត្រីកោណមាត្រ៖ $z = r(\cos\theta + i\sin\theta)$"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={8}
                  className="w-full flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs font-sans text-slate-200 focus:outline-none focus:border-orange-500/50 transition resize-none min-h-[140px]"
                />
              </div>

              {/* Live Preview Area */}
              {noteContent.trim() && (
                <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                  <span className="text-[10px] font-bold text-slate-400 font-sans flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    ទិដ្ឋភាពបង្ហាញមុន (Live Preview)
                  </span>
                  <div className="max-h-[120px] overflow-y-auto bg-black/30 border border-white/5 rounded-xl p-3 text-[11px]">
                    <MathRenderer content={noteContent} />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsCreatingNote(false)}
                  className="px-4 py-1.5 rounded-xl text-xs font-sans font-semibold border border-white/10 hover:bg-white/5 transition text-slate-400 hover:text-white"
                >
                  បោះបង់
                </button>
                <button
                  onClick={handleSaveNote}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-sans font-semibold bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:opacity-90 transition text-white shadow-lg shadow-[#ff4e00]/15"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>កំពុងរក្សាទុក...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>រក្សាទុកនៅ Backend</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 3. Document Viewer */}
          {selectedDoc && (
            <div className="flex flex-col h-full gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 flex-shrink-0">
                <div className="flex flex-col min-w-0">
                  <h4 className="font-sans font-bold text-xs text-white truncate max-w-[200px] sm:max-w-[280px]">
                    {selectedDoc.name}
                  </h4>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    រក្សាទុក៖ {new Date(selectedDoc.createdAt || "").toLocaleString("km-KH")}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Doc details and view */}
              <div className="flex-1 overflow-y-auto max-h-[380px] pr-1">
                {selectedDoc.type === "note" ? (
                  <div className="bg-black/20 border border-white/5 rounded-xl p-4 text-slate-200">
                    <MathRenderer content={selectedDoc.content} />
                  </div>
                ) : selectedDoc.fileType.startsWith("image/") ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40 p-2 max-h-[280px] flex items-center justify-center">
                      <img
                        src={selectedDoc.content}
                        alt={selectedDoc.name}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-[260px] object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans">រូបភាពឯកសារត្រូវបានផ្ទុកពី Backend Server</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-400">
                    <File className="w-12 h-12 text-slate-500 bg-white/5 p-2 rounded-xl" />
                    <span className="text-xs font-sans font-semibold text-slate-300">{selectedDoc.name}</span>
                    <span className="text-[10px] font-sans text-slate-400">ប្រភេទឯកសារ៖ {selectedDoc.fileType}</span>
                    <span className="text-[10px] font-sans text-slate-400">ទំហំសរុប៖ {formatBytes(selectedDoc.size)}</span>
                    <p className="text-[10px] max-w-xs font-sans text-center mt-1">
                      ប្រភេទឯកសារនេះ មិនអាចបើកមើលផ្ទាល់នៅក្នុងកម្មវិធីបានទេ។ សូមចុចប៊ូតុងខាងក្រោមដើម្បីទាញយកឯកសារនេះមកវិញ។
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center border-t border-white/10 pt-3 flex-shrink-0">
                <button
                  onClick={() => handleDeleteDoc(selectedDoc.id, selectedDoc.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-semibold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>លុបឯកសារ</span>
                </button>

                {!selectedDoc.fileType.startsWith("text/markdown") && (
                  <button
                    onClick={() => handleDownloadFile(selectedDoc)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-sans font-semibold bg-white/10 hover:bg-white/15 transition text-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ទាញយកឯកសារ (Download)</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
