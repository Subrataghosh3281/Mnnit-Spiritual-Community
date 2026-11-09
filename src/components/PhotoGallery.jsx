import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, MapPin, Calendar } from 'lucide-react';

export default function PhotoGallery({ photos }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Performances', 'Festivals', 'Traditions', 'Drama', 'Art', 'Memories'];

  const filteredPhotos = photos.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos]);

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="relative py-24 bg-vedic-navy overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-vedic-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-vedic-gold/15 text-vedic-gold border border-vedic-gold/30">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Sacred Visual Archive</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Photo </span>
            <span className="gold-gradient-text">Gallery</span>
          </h2>
          <p className="font-devanagari text-lg text-vedic-saffron">अनहद स्मृतियां • भक्ति एवं संगीत की झलकियां</p>
          <p className="text-sm sm:text-base text-vedic-cream/80 max-w-2xl mx-auto">
            Glimpses of deepotsav lights, ecstatic kirtans, theatrical performances, and musical gatherings at MNNIT Allahabad.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setSelectedPhotoIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep shadow-md font-bold scale-105'
                  : 'bg-vedic-card/80 text-vedic-cream/80 border border-vedic-border/70 hover:text-vedic-gold hover:border-vedic-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-vedic-card border border-vedic-border/70 hover:border-vedic-gold/60 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-vedic-deep">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-vedic-deep/95 via-vedic-deep/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Corner Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-vedic-navy/90 text-vedic-gold border border-vedic-gold/30 backdrop-blur-sm">
                    {photo.category}
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-vedic-gold-light transition-colors line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-vedic-sandal/80 line-clamp-2 leading-snug">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-vedic-surface/80 text-white hover:text-vedic-gold hover:bg-vedic-card border border-white/20 transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-vedic-surface text-white border border-white/20 hover:border-vedic-gold transition-all"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-vedic-surface text-white border border-white/20 hover:border-vedic-gold transition-all"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-vedic-gold/40 shadow-2xl bg-vedic-deep max-h-[75vh] flex items-center justify-center">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                className="max-h-[72vh] max-w-full object-contain"
              />
            </div>

            {/* Lightbox Caption & Details */}
            <div className="w-full max-w-2xl mt-4 p-4 rounded-xl bg-vedic-card/90 border border-vedic-border/70 backdrop-blur-md text-center space-y-1.5 shadow-xl">
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-vedic-saffron text-white">
                  {currentPhoto.category}
                </span>
                <span className="text-xs text-vedic-muted">
                  Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                {currentPhoto.title}
              </h3>

              <p className="text-xs sm:text-sm text-vedic-cream/80 max-w-xl mx-auto">
                {currentPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
